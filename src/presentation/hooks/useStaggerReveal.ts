'use client';

import { useEffect, useRef } from 'react';

export function useStaggerReveal(staggerDelay: number = 100) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const { animate, utils } = await import('animejs');
          const targets = container.querySelectorAll('[data-stagger]');
          animate(targets, {
            translateY: [20, 0],
            opacity: [0, 1],
            delay: utils.stagger(staggerDelay),
            duration: 600,
            ease: 'outCubic',
          });
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [staggerDelay]);

  return containerRef;
}
