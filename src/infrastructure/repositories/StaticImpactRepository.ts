import { ImpactStat } from '@/domain/entities/ImpactStat';
import { IImpactRepository } from '@/domain/repositories/IImpactRepository';

const stats: ImpactStat[] = [
  { id: 'years', label: 'Años de Impacto', value: 14, suffix: '+', color: '#FFC107' },
  { id: 'beneficiaries', label: 'Beneficiarios', value: 1000, suffix: '+', color: '#43A047' },
  { id: 'programs', label: 'Programas Activos', value: 4, suffix: '', color: '#F57C00' },
  { id: 'reach', label: 'Ciudades Alcanzadas', value: 8, suffix: '+', color: '#7B1FA2' },
];

export class StaticImpactRepository implements IImpactRepository {
  async getAll(): Promise<ImpactStat[]> {
    return stats;
  }
}
