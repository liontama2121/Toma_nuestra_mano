'use client';

import { useEffect, useRef } from 'react';

export function useScrollReveal(staggerDelay: number = 100) {
  const containerRef = useRef<HTMLElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const { animate, utils } = await import('animejs');
          const targets = container.querySelectorAll('[data-reveal]');
          animate(targets, {
            opacity: [0, 1],
            translateY: [40, 0],
            delay: utils.stagger(staggerDelay),
            duration: 700,
            ease: 'outCubic',
          });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [staggerDelay]);

  return containerRef;
}
