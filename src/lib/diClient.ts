'use client';

// Client-only DI — instantiated lazily to avoid SSR errors
import { LocalStorageProgressRepository } from '@/infrastructure/repositories/LocalStorageProgressRepository';
import { LocalStorageCertificateRepository } from '@/infrastructure/repositories/LocalStorageCertificateRepository';
import { StaticCourseRepository } from '@/infrastructure/repositories/StaticCourseRepository';
import { StaticProgramRepository } from '@/infrastructure/repositories/StaticProgramRepository';
import { GetCourseProgressUseCase } from '@/application/use-cases/GetCourseProgressUseCase';
import { MarkSectionCompletedUseCase } from '@/application/use-cases/MarkSectionCompletedUseCase';
import { CanAdvanceToNextSectionUseCase } from '@/application/use-cases/CanAdvanceToNextSectionUseCase';
import { IssueCertificateUseCase } from '@/application/use-cases/IssueCertificateUseCase';
import { GetStudentDashboardUseCase } from '@/application/use-cases/GetStudentDashboardUseCase';

let _progressRepo: LocalStorageProgressRepository | null = null;
let _certRepo: LocalStorageCertificateRepository | null = null;

function getProgressRepo() {
  if (!_progressRepo) _progressRepo = new LocalStorageProgressRepository();
  return _progressRepo;
}

function getCertRepo() {
  if (!_certRepo) _certRepo = new LocalStorageCertificateRepository();
  return _certRepo;
}

const courseRepo = new StaticCourseRepository();
const programRepo = new StaticProgramRepository();

export function getClientUseCases() {
  const progressRepo = getProgressRepo();
  const certRepo = getCertRepo();
  return {
    getCourseProgress: new GetCourseProgressUseCase(progressRepo, courseRepo),
    markSectionCompleted: new MarkSectionCompletedUseCase(progressRepo, courseRepo),
    canAdvance: new CanAdvanceToNextSectionUseCase(progressRepo),
    issueCertificate: new IssueCertificateUseCase(certRepo),
    getStudentDashboard: new GetStudentDashboardUseCase(programRepo, courseRepo, progressRepo),
    certRepo,
  };
}
