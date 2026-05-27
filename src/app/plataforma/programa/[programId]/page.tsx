'use client';

export const runtime = 'edge';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ProgramHero } from '@/presentation/components/plataforma/programa/ProgramHero';
import { SectionList } from '@/presentation/components/plataforma/programa/SectionList';
import { getClientUseCases } from '@/lib/diClient';
import { getCoursesByProgramUseCase, getProgramsUseCase } from '@/lib/di';
import { useCourseProgress } from '@/presentation/hooks/useCourseProgress';
import { useStudent } from '@/presentation/hooks/useStudent';
import { Program } from '@/domain/entities/Program';
import { Course } from '@/domain/entities/Course';

export default function ProgramaPage() {
  const { programId } = useParams<{ programId: string }>();
  const student = useStudent();
  const [program, setProgram] = useState<Program | null>(null);
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    Promise.all([
      getProgramsUseCase.execute(),
      getCoursesByProgramUseCase.execute(programId),
    ]).then(([programs, courses]) => {
      setProgram(programs.find((p) => p.id === programId) ?? null);
      setCourse(courses[0] ?? null);
    });
  }, [programId]);

  useEffect(() => {
    if (!course) return;
    getClientUseCases().getCourseProgress.execute(student.id, course.id).catch(() => {});
  }, [course, student.id]);

  const progress = useCourseProgress(course?.id ?? '');

  if (!program || !course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="h-48 rounded-2xl animate-pulse" style={{ background: 'rgba(255,255,255,0.05)' }} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <ProgramHero
        program={program}
        courseId={course.id}
        percentage={progress?.percentage ?? 0}
      />
      <SectionList
        sections={course.sections}
        completedIds={progress?.completedSectionIds ?? []}
        currentId={progress?.currentSectionId ?? course.sections[0].id}
        programId={programId}
        courseId={course.id}
      />
    </div>
  );
}
