import { IProgramRepository } from '@/domain/repositories/IProgramRepository';
import { IProgressRepository } from '@/domain/repositories/IProgressRepository';
import { ICourseRepository } from '@/domain/repositories/ICourseRepository';
import { Program } from '@/domain/entities/Program';
import { Progress } from '@/domain/entities/Progress';

export interface DashboardProgram {
  program: Program;
  courseId: string;
  progress: Progress | null;
}

export interface StudentDashboard {
  programs: DashboardProgram[];
  nextMission: DashboardProgram | null;
}

export class GetStudentDashboardUseCase {
  constructor(
    private readonly programRepo: IProgramRepository,
    private readonly courseRepo: ICourseRepository,
    private readonly progressRepo: IProgressRepository,
  ) {}

  async execute(studentId: string): Promise<StudentDashboard> {
    const programs = await this.programRepo.getAll();

    const programsWithProgress: DashboardProgram[] = await Promise.all(
      programs.map(async (program) => {
        const courses = await this.courseRepo.getByProgramId(program.id);
        const course = courses[0];
        if (!course) return { program, courseId: '', progress: null };
        const progress = await this.progressRepo.get(studentId, course.id);
        return { program, courseId: course.id, progress };
      }),
    );

    const nextMission =
      programsWithProgress.find((p) => p.progress && p.progress.percentage < 100 && p.progress.percentage > 0) ??
      programsWithProgress.find((p) => !p.progress) ??
      null;

    return { programs: programsWithProgress, nextMission };
  }
}
