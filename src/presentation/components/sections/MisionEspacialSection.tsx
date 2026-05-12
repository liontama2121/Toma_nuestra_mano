'use client';

import { useEffect, useRef } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function MisionEspacialSection() {
  const planet1Ref = useRef<SVGGElement>(null);
  const planet2Ref = useRef<SVGGElement>(null);
  const planet3Ref = useRef<SVGGElement>(null);
  const coreRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    (async () => {
      const { animate } = await import('animejs');

      const makeOrbit = (el: SVGGElement | null, dur: number) => {
        if (!el) return;
        let angle = 0;
        const step = () => {
          angle += (360 / dur) * 16;
          el.style.transform = `rotate(${angle}deg)`;
          el.style.transformOrigin = '150px 150px';
          requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };

      makeOrbit(planet1Ref.current, 6000);
      makeOrbit(planet2Ref.current, 10000);
      makeOrbit(planet3Ref.current, 16000);

      if (coreRef.current) {
        animate(coreRef.current, {
          scale: [1, 1.05, 1],
          loop: true,
          ease: 'inOutSine',
          duration: 3000,
        });
      }
    })();
  }, []);

  const features = [
    '🔭 Astronomía y exploración espacial',
    '🤖 Robótica aplicada a misiones',
    '💻 Programación de simulaciones',
    '🧪 Ciencias aplicadas STEM',
    '🌍 Impacto nacional e internacional',
  ];

  return (
    <section id="mision" className="relative py-24 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(10,36,114,0.25) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Orbital SVG */}
          <div className="flex justify-center order-2 lg:order-1">
            <svg viewBox="0 0 300 300" className="w-72 h-72 sm:w-96 sm:h-96">
              {[60, 100, 130].map((r, i) => (
                <circle key={r} cx="150" cy="150" r={r} fill="none"
                  stroke="rgba(255,255,255,0.08)" strokeWidth="1"
                  strokeDasharray={i === 1 ? '4 6' : undefined} />
              ))}

              <circle ref={coreRef} cx="150" cy="150" r="38" fill="#0A2472" />
              <circle cx="150" cy="150" r="38" fill="none" stroke="#1565C0" strokeWidth="2" />
              <text x="150" y="158" textAnchor="middle" fontSize="26">🌍</text>

              <g ref={planet1Ref}>
                <circle cx="210" cy="150" r="14" fill="#FFC107" opacity="0.9" />
                <text x="210" y="155" textAnchor="middle" fontSize="12">🚀</text>
              </g>

              <g ref={planet2Ref}>
                <circle cx="150" cy="50" r="12" fill="#7B1FA2" opacity="0.85" />
                <text x="150" y="55" textAnchor="middle" fontSize="11">⭐</text>
              </g>

              <g ref={planet3Ref}>
                <circle cx="280" cy="150" r="11" fill="#2E7D32" opacity="0.85" />
                <text x="280" y="155" textAnchor="middle" fontSize="10">🛸</text>
              </g>

              <circle cx="150" cy="150" r="50" fill="none" stroke="#0A2472" strokeWidth="20" opacity="0.15" />
            </svg>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge color="#FFC107">Programa Insignia</Badge>
              <Badge color="#43A047">STEM</Badge>
              <Badge color="#7B1FA2">Internacional</Badge>
            </div>

            <h2 className="font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              Misión Espacial
              <span className="block bg-gradient-to-r from-[#FFC107] to-[#F57C00] bg-clip-text text-transparent">
                Colombia 🚀
              </span>
            </h2>

            <p className="text-[#E8F0FE]/70 text-base leading-relaxed mb-8">
              Nuestro programa bandera que lleva la ciencia y la tecnología espacial a niños y jóvenes colombianos.
              Porque el cosmos no tiene fronteras y el talento colombiano puede llegar a las estrellas.
            </p>

            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-[#E8F0FE]/80 text-sm">
                  <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#FFC107]" />
                  {f}
                </li>
              ))}
            </ul>

            <a href="https://www.youtube.com/watch?v=TiUXXV65txo" target="_blank" rel="noopener noreferrer">
              <Button size="lg">▶ Ver Misión Espacial Colombia</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
