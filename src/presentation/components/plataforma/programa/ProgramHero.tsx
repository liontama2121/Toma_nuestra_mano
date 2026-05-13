'use client';

import { useEffect, useRef } from 'react';
import { Program } from '@/domain/entities/Program';
import Link from 'next/link';

const PILAR_COLORS: Record<string, string> = {
  'mision-espacial': 'var(--tnm-pilar-mision)',
  'desarrollo-digital': 'var(--tnm-pilar-desarrollo)',
  'arte-cultura': 'var(--tnm-pilar-arte)',
  'bienestar-comunitario': 'var(--tnm-pilar-bienestar)',
};

const FLOATING_EMOJIS = [
  { selector: '[data-float="1"]', amplitude: 14, duration: 3200 },
  { selector: '[data-float="2"]', amplitude: 10, duration: 4000 },
  { selector: '[data-float="3"]', amplitude: 16, duration: 2800 },
];

interface ProgramHeroProps {
  program: Program;
  courseId: string;
  percentage: number;
}

export function ProgramHero({ program, courseId, percentage }: ProgramHeroProps) {
  const floatRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const color = PILAR_COLORS[program.id] ?? program.color;

  useEffect(() => {
    const container = floatRef.current;
    const bar = barRef.current;
    if (!container && !bar) return;
    let cancelled = false;

    (async () => {
      const { animate } = await import('animejs');
      if (cancelled) return;

      if (bar) animate(bar, { width: [`0%`, `${percentage}%`], duration: 800, ease: 'outCubic' });

      FLOATING_EMOJIS.forEach(({ selector, amplitude, duration }) => {
        const el = container?.querySelector(selector);
        if (!el) return;
        animate(el, {
          translateY: [`-${amplitude}px`, `${amplitude}px`],
          loop: true,
          alternate: true,
          ease: 'inOutSine',
          duration,
        });
      });
    })();

    return () => { cancelled = true; };
  }, [percentage]);

  const continueHref = courseId
    ? `/plataforma/programa/${program.id}/curso/${courseId}/seccion/1`
    : '#';

  return (
    <div className="relative rounded-2xl overflow-hidden p-8 mb-8 border border-white/10"
      style={{ background: `linear-gradient(135deg, ${color}30 0%, var(--tnm-bg) 60%)` }}>

      <div ref={floatRef} className="absolute top-4 right-4 flex gap-4 text-3xl pointer-events-none select-none">
        <span data-float="1">🌍</span>
        <span data-float="2">⭐</span>
        <span data-float="3">🛸</span>
      </div>

      <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: 'var(--tnm-text-muted)' }}>
        <Link href="/plataforma" className="hover:text-[#F59E0B] transition-colors duration-200 cursor-pointer">Panel</Link>
        <span>/</span>
        <span style={{ color: 'var(--tnm-text-primary)' }}>{program.title}</span>
      </nav>

      <span className="text-4xl mb-4 block">{program.icon}</span>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">{program.title}</h1>
      <p className="mb-6 max-w-xl text-sm" style={{ color: 'var(--tnm-text-muted)' }}>{program.description}</p>

      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--tnm-text-muted)' }}>
          <span>Progreso del programa</span>
          <span style={{ color }}>{percentage}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div ref={barRef} className="h-full rounded-full" style={{ background: color, width: '0%' }} />
        </div>
      </div>

      <Link href={continueHref}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-200 hover:opacity-90 cursor-pointer"
        style={{ background: 'var(--tnm-accent)', color: '#000' }}>
        {percentage > 0 ? 'Continuar' : 'Comenzar'} →
      </Link>
    </div>
  );
}
