'use client';

import { z } from 'zod';
import { Certificate } from '@/domain/entities/Certificate';
import { ICertificateRepository } from '@/domain/repositories/ICertificateRepository';

const CertSchema = z.object({
  id: z.string(),
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
    localStorage.setItem(lookupKey(cert.id, cert.studentName), cert.id);
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
      // scan localStorage for matching cert
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!k?.startsWith('tnm:certificate:')) continue;
        const raw = localStorage.getItem(k);
        if (!raw) continue;
        const cert = CertSchema.safeParse(JSON.parse(raw));
        if (!cert.success) continue;
        // We store courseId indirectly via courseTitle lookup — match by stored data
        if (localStorage.getItem(lookupKey(courseId, studentId)) === cert.data.id) {
          return cert.data;
        }
      }
      return null;
    } catch {
      return null;
    }
  }
}
