import { Program } from '@/domain/entities/Program';
import { IProgramRepository } from '@/domain/repositories/IProgramRepository';

export class GetProgramsUseCase {
  constructor(private readonly repo: IProgramRepository) {}

  async execute(): Promise<Program[]> {
    return this.repo.getAll();
  }
}
