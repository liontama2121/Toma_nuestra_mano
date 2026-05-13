import { ICourseRepository } from '@/domain/repositories/ICourseRepository';
import { Course } from '@/domain/entities/Course';

export class GetCoursesByProgramUseCase {
  constructor(private readonly repo: ICourseRepository) {}

  async execute(programId: string): Promise<Course[]> {
    return this.repo.getByProgramId(programId);
  }
}
