import { IProgressRepository } from '@/domain/repositories/IProgressRepository';

export class CanAdvanceToNextSectionUseCase {
  constructor(private readonly progressRepo: IProgressRepository) {}

  async execute(studentId: string, courseId: string, sectionId: string): Promise<boolean> {
    const progress = await this.progressRepo.get(studentId, courseId);
    if (!progress) return false;
    return progress.completedSectionIds.includes(sectionId);
  }
}
