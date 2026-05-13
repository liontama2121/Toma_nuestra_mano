import { StaticProgramRepository } from '@/infrastructure/repositories/StaticProgramRepository';
import { StaticImpactRepository } from '@/infrastructure/repositories/StaticImpactRepository';
import { StaticDonationRepository } from '@/infrastructure/repositories/StaticDonationRepository';
import { StaticVideoRepository } from '@/infrastructure/repositories/StaticVideoRepository';
import { StaticCourseRepository } from '@/infrastructure/repositories/StaticCourseRepository';
import { GetProgramsUseCase } from '@/application/use-cases/GetProgramsUseCase';
import { GetImpactStatsUseCase } from '@/application/use-cases/GetImpactStatsUseCase';
import { GetDonationAmountsUseCase } from '@/application/use-cases/GetDonationAmountsUseCase';
import { GetVideosUseCase } from '@/application/use-cases/GetVideosUseCase';
import { GetCoursesByProgramUseCase } from '@/application/use-cases/GetCoursesByProgramUseCase';
import { GetCourseDetailUseCase } from '@/application/use-cases/GetCourseDetailUseCase';

// Public site — server-safe singletons
export const getProgramsUseCase = new GetProgramsUseCase(new StaticProgramRepository());
export const getImpactStatsUseCase = new GetImpactStatsUseCase(new StaticImpactRepository());
export const getDonationAmountsUseCase = new GetDonationAmountsUseCase(new StaticDonationRepository());
export const getVideosUseCase = new GetVideosUseCase(new StaticVideoRepository());

// Plataforma — static repos (server-safe)
const courseRepo = new StaticCourseRepository();
const programRepo = new StaticProgramRepository();
export const getCoursesByProgramUseCase = new GetCoursesByProgramUseCase(courseRepo);
export const getCourseDetailUseCase = new GetCourseDetailUseCase(courseRepo);

// Plataforma — client-only use cases use lazy factories exported below
export { courseRepo, programRepo };
