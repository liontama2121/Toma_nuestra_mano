'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Program } from '@/domain/entities/Program';
import { Progress } from '@/domain/entities/Progress';

const PILAR_COLORS: Record<string, string> = {
  'mision-espacial': 'var(--tnm-pilar-mision)',
  'desarrollo-digital': 'var(--tnm-pilar-desarrollo)',
  'arte-cultura': 'var(--tnm-pilar-arte)',
  'bienestar-comunitario': 'var(--tnm-pilar-bienestar)',
};

interface ProgramCardProps {
  program: Program;
  courseId: string;
  progress: Progress | null;
}

export function ProgramCard({ program, courseId, progress }: ProgramCardProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const color = PILAR_COLORS[program.id] ?? program.color;
  const pct = progress?.percentage ?? 0;

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let cancelled = false;
    (async () => {
      const { animate } = await import('animejs');
      if (cancelled) return;
      animate(bar, { width: [`0%`, `${pct}%`], duration: 800, ease: 'outCubic' });
    })();
    return () => { cancelled = true; };
  }, [pct]);

  const href = courseId ? `/plataforma/programa/${program.id}` : '#';

  return (
    <Link href={href} data-stagger
      className="block rounded-2xl p-6 border border-white/10 transition-all duration-200 hover:border-white/20 hover:scale-[1.02] cursor-pointer"
      style={{ background: 'var(--tnm-bg)', outline: 'none' }}>
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl" role="img" aria-label={program.title}>{program.icon}</span>
        <span className="text-xs px-2 py-1 rounded-full font-bold"
          style={{ background: `${color}22`, color }}>
          {pct}%
        </span>
      </div>

      <h3 className="font-bold text-base mb-1" style={{ color: 'var(--tnm-text-primary)' }}>
        {program.title}
      </h3>
      <p className="text-xs mb-4 line-clamp-2" style={{ color: 'var(--tnm-text-muted)' }}>
        {program.description}
      </p>

      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div ref={barRef} className="h-full rounded-full" style={{ background: color, width: '0%' }} />
      </div>

      <p className="mt-2 text-xs" style={{ color: 'var(--tnm-text-muted)' }}>
        {pct === 0 ? 'Sin empezar' : pct === 100 ? '¡Completado! ✅' : 'En progreso'}
      </p>
    </Link>
  );
}
