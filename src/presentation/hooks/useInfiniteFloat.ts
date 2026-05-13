'use client';

import { useEffect, useRef } from 'react';

export function useInfiniteFloat(elements: { selector: string; amplitude?: number; duration?: number }[]) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;

    (async () => {
      const { animate } = await import('animejs');
      if (cancelled) return;

      elements.forEach(({ selector, amplitude = 12, duration = 3000 }) => {
        const el = container.querySelector(selector);
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return containerRef;
}
