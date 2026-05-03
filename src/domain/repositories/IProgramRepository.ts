import { Program } from '../entities/Program';

export interface IProgramRepository {
  getAll(): Promise<Program[]>;
  getById(id: string): Promise<Program | null>;
}
