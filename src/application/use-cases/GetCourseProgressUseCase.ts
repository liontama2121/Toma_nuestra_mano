import { IProgressRepository } from '@/domain/repositories/IProgressRepository';
import { ICourseRepository } from '@/domain/repositories/ICourseRepository';
import { Progress } from '@/domain/entities/Progress';

export class GetCourseProgressUseCase {
  constructor(
    private readonly progressRepo: IProgressRepository,
    private readonly courseRepo: ICourseRepository,
  ) {}

  async execute(studentId: string, courseId: string): Promise<Progress> {
    const existing = await this.progressRepo.get(studentId, courseId);
    if (existing) return existing;

    const course = await this.courseRepo.getById(courseId);
    if (!course) throw new Error(`Course ${courseId} not found`);

    const fresh: Progress = {
      studentId,
      courseId,
      completedSectionIds: [],
      currentSectionId: course.sections[0].id,
      startedAt: new Date().toISOString(),
      completedAt: null,
      percentage: 0,
    };
    await this.progressRepo.save(fresh);
    return fresh;
  }
}
