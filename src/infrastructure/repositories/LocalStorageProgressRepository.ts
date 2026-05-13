'use client';

import { z } from 'zod';
import { Progress } from '@/domain/entities/Progress';
import { IProgressRepository } from '@/domain/repositories/IProgressRepository';

const ProgressSchema = z.object({
  studentId: z.string(),
  courseId: z.string(),
  completedSectionIds: z.array(z.string()),
  currentSectionId: z.string(),
  startedAt: z.string(),
  completedAt: z.string().nullable(),
  percentage: z.number(),
});

const key = (studentId: string, courseId: string) => `tnm:progress:${studentId}:${courseId}`;
const indexKey = (studentId: string) => `tnm:progress-index:${studentId}`;

export class LocalStorageProgressRepository implements IProgressRepository {
  async get(studentId: string, courseId: string): Promise<Progress | null> {
    try {
      const raw = localStorage.getItem(key(studentId, courseId));
      if (!raw) return null;
      return ProgressSchema.parse(JSON.parse(raw));
    } catch {
      return null;
    }
  }

  async save(progress: Progress): Promise<void> {
    localStorage.setItem(key(progress.studentId, progress.courseId), JSON.stringify(progress));

    const idxRaw = localStorage.getItem(indexKey(progress.studentId));
    const index: string[] = idxRaw ? JSON.parse(idxRaw) : [];
    if (!index.includes(progress.courseId)) {
      index.push(progress.courseId);
      localStorage.setItem(indexKey(progress.studentId), JSON.stringify(index));
    }

    window.dispatchEvent(new CustomEvent('tnm:progress-updated', { detail: progress }));
  }

  async getAllByStudent(studentId: string): Promise<Progress[]> {
    const idxRaw = localStorage.getItem(indexKey(studentId));
    if (!idxRaw) return [];
    const courseIds: string[] = JSON.parse(idxRaw);
    const results = await Promise.all(courseIds.map((id) => this.get(studentId, id)));
    return results.filter((p): p is Progress => p !== null);
  }
}
