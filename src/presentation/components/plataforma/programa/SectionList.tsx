import Link from 'next/link';
import { Section } from '@/domain/entities/Section';

interface SectionListProps {
  sections: Section[];
  completedIds: string[];
  currentId: string;
  programId: string;
  courseId: string;
}

export function SectionList({ sections, completedIds, currentId, programId, courseId }: SectionListProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--tnm-accent)' }}>
        Secciones del curso
      </h2>
      {sections.map((section) => {
        const done = completedIds.includes(section.id);
        const current = section.id === currentId && !done;
        const locked = !done && !current && section.order > 1;
        const href = locked ? '#' : `/plataforma/programa/${programId}/curso/${courseId}/seccion/${section.order}`;

        return (
          <Link key={section.id} href={href}
            aria-disabled={locked}
            className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
              locked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:border-white/20'
            } ${current ? 'border-[#F59E0B]/50' : 'border-white/10'}`}
            style={{ background: current ? 'rgba(245,158,11,0.08)' : 'var(--tnm-bg)' }}
            onClick={(e) => locked && e.preventDefault()}>

            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
              done ? 'bg-green-500' : current ? 'bg-[#F59E0B]' : 'bg-white/10'
            }`} style={{ color: done || current ? '#000' : 'var(--tnm-text-muted)' }}>
              {done ? '✓' : section.order}
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: 'var(--tnm-text-primary)' }}>
                {section.title}
              </p>
              <p className="text-xs" style={{ color: 'var(--tnm-text-muted)' }}>
                {Math.round(section.durationSeconds / 60)} min
                {done && ' · Completada'}
                {current && ' · En progreso'}
                {locked && ' · Bloqueada'}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
