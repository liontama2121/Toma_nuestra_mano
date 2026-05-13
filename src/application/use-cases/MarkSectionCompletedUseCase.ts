import { IProgressRepository } from '@/domain/repositories/IProgressRepository';
import { ICourseRepository } from '@/domain/repositories/ICourseRepository';
import { Progress } from '@/domain/entities/Progress';

export class MarkSectionCompletedUseCase {
  constructor(
    private readonly progressRepo: IProgressRepository,
    private readonly courseRepo: ICourseRepository,
  ) {}

  async execute(studentId: string, courseId: string, sectionId: string): Promise<Progress> {
    const [progress, course] = await Promise.all([
      this.progressRepo.get(studentId, courseId),
      this.courseRepo.getById(courseId),
    ]);
    if (!course) throw new Error(`Course ${courseId} not found`);

    const completed = progress?.completedSectionIds ?? [];
    const completedIds = Array.from(new Set([...completed, sectionId]));

    const totalSections = course.sections.length;
    const percentage = Math.round((completedIds.length / totalSections) * 100);

    const currentIndex = course.sections.findIndex((s) => s.id === sectionId);
    const nextSection = course.sections[currentIndex + 1] ?? course.sections[currentIndex];

    const updated: Progress = {
      studentId,
      courseId,
      completedSectionIds: completedIds,
      currentSectionId: nextSection.id,
      startedAt: progress?.startedAt ?? new Date().toISOString(),
      completedAt: percentage === 100 ? new Date().toISOString() : null,
      percentage,
    };

    await this.progressRepo.save(updated);
    return updated;
  }
}
