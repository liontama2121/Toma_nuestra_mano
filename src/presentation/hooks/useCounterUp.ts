'use client';

import { useEffect, useRef } from 'react';

export function useCounterUp(target: number, duration: number = 2000, suffix: string = '') {
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const { animate } = await import('animejs');
          const obj = { value: 0 };
          animate(obj, {
            value: target,
            duration,
            ease: 'outExpo',
            onUpdate() {
              if (el) el.textContent = Math.round(obj.value).toLocaleString('es-CO') + suffix;
            },
          });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, suffix]);

  return ref;
}
