import { ICourseRepository } from '@/domain/repositories/ICourseRepository';
import { Course } from '@/domain/entities/Course';

export class GetCourseDetailUseCase {
  constructor(private readonly repo: ICourseRepository) {}

  async execute(courseId: string): Promise<Course | null> {
    return this.repo.getById(courseId);
  }
}
