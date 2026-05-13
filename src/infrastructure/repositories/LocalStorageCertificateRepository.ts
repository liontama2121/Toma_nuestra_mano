'use client';

import { z } from 'zod';
import { Certificate } from '@/domain/entities/Certificate';
import { ICertificateRepository } from '@/domain/repositories/ICertificateRepository';

const CertSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  courseId: z.string(),
  studentName: z.string(),
  courseTitle: z.string(),
  programName: z.string(),
  issuedAt: z.string(),
  signature: z.string(),
});

const certKey = (certId: string) => `tnm:certificate:${certId}`;
const lookupKey = (courseId: string, studentId: string) => `tnm:cert-lookup:${studentId}:${courseId}`;

export class LocalStorageCertificateRepository implements ICertificateRepository {
  async issue(cert: Certificate): Promise<void> {
    localStorage.setItem(certKey(cert.id), JSON.stringify(cert));
    localStorage.setItem(lookupKey(cert.courseId, cert.studentId), cert.id);
  }

  async getById(certId: string): Promise<Certificate | null> {
    try {
      const raw = localStorage.getItem(certKey(certId));
      if (!raw) return null;
      return CertSchema.parse(JSON.parse(raw));
    } catch {
      return null;
    }
  }

  async getByCourseAndStudent(courseId: string, studentId: string): Promise<Certificate | null> {
    try {
      const certId = localStorage.getItem(lookupKey(courseId, studentId));
      if (!certId) return null;
      return this.getById(certId);
    } catch {
      return null;
    }
  }
}
