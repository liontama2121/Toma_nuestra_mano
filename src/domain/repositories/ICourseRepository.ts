import { Course } from '../entities/Course';

export interface ICourseRepository {
  getByProgramId(programId: string): Promise<Course[]>;
  getById(courseId: string): Promise<Course | null>;
}
