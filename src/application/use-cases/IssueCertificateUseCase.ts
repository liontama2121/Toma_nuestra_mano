import { ICertificateRepository } from '@/domain/repositories/ICertificateRepository';
import { Certificate } from '@/domain/entities/Certificate';
import { v4 as uuidv4 } from 'uuid';

export class IssueCertificateUseCase {
  constructor(private readonly certRepo: ICertificateRepository) {}

  async execute(params: {
    studentId: string;
    studentName: string;
    courseId: string;
    courseTitle: string;
    programName: string;
  }): Promise<Certificate> {
    const existing = await this.certRepo.getByCourseAndStudent(params.courseId, params.studentId);
    if (existing) return existing;

    const cert: Certificate = {
      id: uuidv4(),
      studentName: params.studentName,
      courseTitle: params.courseTitle,
      programName: params.programName,
      issuedAt: new Date().toISOString(),
      signature: uuidv4().replace(/-/g, '').slice(0, 8).toUpperCase(),
    };

    await this.certRepo.issue(cert);
    return cert;
  }
}
