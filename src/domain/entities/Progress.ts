export interface Progress {
  studentId: string;
  courseId: string;
  completedSectionIds: string[];
  currentSectionId: string;
  startedAt: string;
  completedAt: string | null;
  percentage: number;
}
