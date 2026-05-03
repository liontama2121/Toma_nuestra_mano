import { ImpactStat } from '../entities/ImpactStat';

export interface IImpactRepository {
  getAll(): Promise<ImpactStat[]>;
}
