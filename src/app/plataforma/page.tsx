'use client';

import { useEffect, useState } from 'react';
import { WelcomeBlock } from '@/presentation/components/plataforma/dashboard/WelcomeBlock';
import { ProgramCard } from '@/presentation/components/plataforma/dashboard/ProgramCard';
import { NextMissionCard } from '@/presentation/components/plataforma/dashboard/NextMissionCard';
import { BadgesStrip } from '@/presentation/components/plataforma/dashboard/BadgesStrip';
import { useStaggerReveal } from '@/presentation/hooks/useStaggerReveal';
import { useStudent } from '@/presentation/hooks/useStudent';
import { getClientUseCases } from '@/lib/diClient';
import { StudentDashboard } from '@/application/use-cases/GetStudentDashboardUseCase';

export default function PlataformaPage() {
  const student = useStudent();
  const [dashboard, setDashboard] = useState<StudentDashboard | null>(null);
  const gridRef = useStaggerReveal(100);

  useEffect(() => {
    getClientUseCases().getStudentDashboard.execute(student.id).then(setDashboard);
  }, [student.id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <WelcomeBlock displayName={student.displayName} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-sm font-bold tracking-widest uppercase mb-6" style={{ color: 'var(--tnm-accent)' }}>
            Mis programas
          </h2>
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dashboard?.programs.map((item) => (
              <ProgramCard
                key={item.program.id}
                program={item.program}
                courseId={item.courseId}
                progress={item.progress}
              />
            )) ?? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-48 rounded-2xl animate-pulse" style={{ background: 'rgba(255,255,255,0.05)' }} />
              ))
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <NextMissionCard next={dashboard?.nextMission ?? null} />
          <BadgesStrip />
        </div>
      </div>
    </div>
  );
}
