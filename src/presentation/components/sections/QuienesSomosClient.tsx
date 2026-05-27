'use client';

import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Card } from '../ui/Card';

type Props = {
  data: {
    mission: string;
    vision: string;
    history: { year: string; title: string; text: string }[];
  };
};

export function QuienesSomosClient({ data }: Props) {
  const ref = useScrollReveal(120) as React.RefObject<HTMLDivElement>;

  return (
    <section className="relative pt-32 pb-24">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(255,193,7,0.08) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <p className="text-[#FFC107] text-sm font-bold tracking-widest uppercase mb-3">Quiénes Somos</p>
          <h1 className="font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Fundación
            <span className="bg-gradient-to-r from-[#FFC107] to-[#F57C00] bg-clip-text text-transparent"> Toma Nuestra Mano</span>
          </h1>
          <p className="text-[#E8F0FE]/60 max-w-2xl mx-auto">
            Para Tu Desarrollo Social Integral — Bogotá, Colombia · desde 2010
          </p>
        </div>

        <div className="mb-16">
          <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(10,36,114,0.4)] bg-black">
            <video
              controls
              preload="metadata"
              playsInline
              poster="/logo.png"
              className="w-full h-auto aspect-video object-contain bg-black"
            >
              <source src="/video/corporativo.mp4" type="video/mp4" />
              Tu navegador no soporta video HTML5.
            </video>
          </div>
          <p className="text-center text-[#E8F0FE]/40 text-xs mt-3">
            Video institucional — Fundación Toma Nuestra Mano
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div data-reveal>
            <Card glowColor="#0A2472" className="h-full">
              <p className="text-[#FFC107] text-xs font-bold tracking-widest uppercase mb-3">Misión</p>
              <p className="text-[#E8F0FE]/80 text-sm leading-relaxed">{data.mission}</p>
            </Card>
          </div>
          <div data-reveal>
            <Card glowColor="#2E7D32" className="h-full">
              <p className="text-[#43A047] text-xs font-bold tracking-widest uppercase mb-3">Visión</p>
              <p className="text-[#E8F0FE]/80 text-sm leading-relaxed">{data.vision}</p>
            </Card>
          </div>
        </div>

        <div>
          <p className="text-[#FFC107] text-xs font-bold tracking-widest uppercase mb-3 text-center">Historia</p>
          <h2 className="font-black text-2xl sm:text-3xl text-white mb-8 text-center">
            Más de <span className="text-[#FFC107]">15 años</span> tendiendo la mano
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.history.map((h) => (
              <Card key={h.year} glowColor="#7B1FA2" className="flex gap-5">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-sm text-white bg-gradient-to-br from-[#7B1FA2] to-[#AB47BC] shadow-lg">
                    {h.year}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base mb-2">{h.title}</h3>
                  <p className="text-[#E8F0FE]/60 text-sm leading-relaxed">{h.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
