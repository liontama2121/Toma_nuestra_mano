import { Progress } from '../entities/Progress';

export interface IProgressRepository {
  get(studentId: string, courseId: string): Promise<Progress | null>;
  save(progress: Progress): Promise<void>;
  getAllByStudent(studentId: string): Promise<Progress[]>;
}
