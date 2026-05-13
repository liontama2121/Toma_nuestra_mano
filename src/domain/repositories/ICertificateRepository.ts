import { Certificate } from '../entities/Certificate';

export interface ICertificateRepository {
  issue(cert: Certificate): Promise<void>;
  getById(certId: string): Promise<Certificate | null>;
  getByCourseAndStudent(courseId: string, studentId: string): Promise<Certificate | null>;
}
