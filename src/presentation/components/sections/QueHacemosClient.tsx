'use client';

import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Card } from '../ui/Card';

type Area = {
  icon: string;
  title: string;
  desc: string;
  color: string;
  gradient: string;
};

export function QueHacemosClient({ areas }: { areas: Area[] }) {
  const ref = useScrollReveal(100) as React.RefObject<HTMLDivElement>;

  return (
    <section className="relative pt-32 pb-24">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 0%, rgba(67,160,71,0.08) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <p className="text-[#FFC107] text-sm font-bold tracking-widest uppercase mb-3">Qué Hacemos</p>
          <h1 className="font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Áreas de
            <span className="bg-gradient-to-r from-[#43A047] to-[#FFC107] bg-clip-text text-transparent"> trabajo</span>
          </h1>
          <p className="text-[#E8F0FE]/60 max-w-2xl mx-auto">
            Siete frentes de impacto que articulan nuestro compromiso con el desarrollo social integral de Colombia.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((a) => (
            <div key={a.title} data-reveal>
              <Card glowColor={a.color} className="h-full group cursor-default">
                <div className={`w-14 h-14 mb-5 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br ${a.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {a.icon}
                </div>
                <h3 className="font-bold text-white text-lg mb-3">{a.title}</h3>
                <p className="text-[#E8F0FE]/60 text-sm leading-relaxed">{a.desc}</p>
                <div className="mt-4 h-0.5 w-12 rounded-full transition-all duration-300 group-hover:w-full"
                  style={{ background: `linear-gradient(to right, ${a.color}, transparent)` }} />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
