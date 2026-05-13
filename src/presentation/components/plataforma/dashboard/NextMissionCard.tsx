import Link from 'next/link';
import { DashboardProgram } from '@/application/use-cases/GetStudentDashboardUseCase';

interface NextMissionCardProps {
  next: DashboardProgram | null;
}

export function NextMissionCard({ next }: NextMissionCardProps) {
  if (!next) return null;

  const href = next.courseId ? `/plataforma/programa/${next.program.id}` : '/plataforma';

  return (
    <div className="rounded-2xl p-6 border border-white/10"
      style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(6,182,212,0.15) 100%)' }}>
      <p className="text-xs font-bold tracking-widest mb-2 uppercase" style={{ color: 'var(--tnm-accent)' }}>
        Próxima misión
      </p>
      <h3 className="text-lg font-bold mb-1">{next.program.title}</h3>
      <p className="text-sm mb-5" style={{ color: 'var(--tnm-text-muted)' }}>
        {next.progress ? `Continuando — ${next.progress.percentage}% completado` : 'Sin empezar — ¡comencemos!'}
      </p>
      <Link href={href}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all duration-200 hover:opacity-90 cursor-pointer"
        style={{ background: 'var(--tnm-accent)', color: '#000' }}>
        {next.progress ? 'Continuar misión' : 'Iniciar misión'} →
      </Link>
    </div>
  );
}
