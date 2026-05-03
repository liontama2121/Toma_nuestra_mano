import { ImpactStat } from '@/domain/entities/ImpactStat';
import { IImpactRepository } from '@/domain/repositories/IImpactRepository';

export class GetImpactStatsUseCase {
  constructor(private readonly repo: IImpactRepository) {}

  async execute(): Promise<ImpactStat[]> {
    return this.repo.getAll();
  }
}
