import { StaticProgramRepository } from '@/infrastructure/repositories/StaticProgramRepository';
import { StaticImpactRepository } from '@/infrastructure/repositories/StaticImpactRepository';
import { StaticDonationRepository } from '@/infrastructure/repositories/StaticDonationRepository';
import { GetProgramsUseCase } from '@/application/use-cases/GetProgramsUseCase';
import { GetImpactStatsUseCase } from '@/application/use-cases/GetImpactStatsUseCase';
import { GetDonationAmountsUseCase } from '@/application/use-cases/GetDonationAmountsUseCase';

export const getProgramsUseCase = new GetProgramsUseCase(new StaticProgramRepository());
export const getImpactStatsUseCase = new GetImpactStatsUseCase(new StaticImpactRepository());
export const getDonationAmountsUseCase = new GetDonationAmountsUseCase(new StaticDonationRepository());
