'use client';

import { useEffect } from 'react';

export function Confetti() {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { animate } = await import('animejs');
      if (cancelled) return;

      const container = document.getElementById('confetti-container');
      if (!container) return;

      const colors = ['#F59E0B', '#FBBF24', '#8B5CF6', '#A78BFA', '#FFF'];
      const particles = Array.from({ length: 40 }).map(() => {
        const el = document.createElement('div');
        el.style.cssText = `
          position:absolute;
          width:${6 + Math.random() * 8}px;
          height:${6 + Math.random() * 8}px;
          border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
          background:${colors[Math.floor(Math.random() * colors.length)]};
          top:50%;left:50%;
          pointer-events:none;
        `;
        container.appendChild(el);
        return el;
      });

      particles.forEach((el) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 200;
        animate(el, {
          translateX: Math.cos(angle) * distance,
          translateY: Math.sin(angle) * distance - 100,
          rotate: Math.random() * 720 - 360,
          opacity: [1, 0],
          duration: 1500 + Math.random() * 1000,
          ease: 'outExpo',
          onComplete: () => el.remove(),
        });
      });
    })();

    return () => { cancelled = true; };
  }, []);

  return <div id="confetti-container" className="absolute inset-0 overflow-hidden pointer-events-none" />;
}
