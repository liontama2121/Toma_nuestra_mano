'use client';

import { useEffect, useRef } from 'react';
import { useCourseProgress } from '@/presentation/hooks/useCourseProgress';

interface CourseProgressBarProps {
  courseId: string;
}

export function CourseProgressBar({ courseId }: CourseProgressBarProps) {
  const progress = useCourseProgress(courseId);
  const barRef = useRef<HTMLDivElement>(null);
  const prevPct = useRef(0);
  const pct = progress?.percentage ?? 0;

  useEffect(() => {
    const bar = barRef.current;
    if (!bar || pct === prevPct.current) return;
    prevPct.current = pct;
    let cancelled = false;

    (async () => {
      const { animate } = await import('animejs');
      if (cancelled) return;
      animate(bar, { width: `${pct}%`, duration: 600, ease: 'outCubic' });
    })();

    return () => { cancelled = true; };
  }, [pct]);

  return (
    <div className="fixed top-16 left-0 right-0 z-40 h-1" style={{ background: 'rgba(255,255,255,0.06)' }}>
      <div ref={barRef} className="h-full" style={{ background: 'var(--tnm-accent)', width: `${pct}%` }} />
    </div>
  );
}
