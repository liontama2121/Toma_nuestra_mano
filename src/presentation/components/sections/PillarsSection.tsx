'use client';

import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Card } from '../ui/Card';

const pillars = [
  {
    icon: '⚡',
    title: 'Tecnología',
    desc: 'Acercamos las herramientas del siglo XXI a comunidades que las necesitan, democratizando el acceso al conocimiento tecnológico.',
    color: '#0A2472',
    gradient: 'from-[#0A2472] to-[#1565C0]',
  },
  {
    icon: '💡',
    title: 'Innovación',
    desc: 'Creamos espacios para que niños y jóvenes desarrollen soluciones creativas a los retos de su entorno con pensamiento innovador.',
    color: '#7B1FA2',
    gradient: 'from-[#7B1FA2] to-[#AB47BC]',
  },
  {
    icon: '📚',
    title: 'Educación',
    desc: 'La educación de calidad como motor de transformación. Programas formativos que abren caminos y construyen futuros brillantes.',
    color: '#F57C00',
    gradient: 'from-[#F57C00] to-[#FFC107]',
  },
  {
    icon: '🤝',
    title: 'Comunidad',
    desc: 'Trabajamos junto a las comunidades, no para ellas. El cambio verdadero nace desde adentro, con valores de unión y solidaridad.',
    color: '#2E7D32',
    gradient: 'from-[#2E7D32] to-[#43A047]',
  },
];

export function PillarsSection() {
  const ref = useScrollReveal(120) as React.RefObject<HTMLDivElement>;

  return (
    <section id="pilares" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#FFC107] text-sm font-bold tracking-widest uppercase mb-3 font-orbitron">Nuestros Pilares</p>
          <h2 className="font-orbitron font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            El futuro se construye
            <span className="bg-gradient-to-r from-[#FFC107] to-[#F57C00] bg-clip-text text-transparent"> sobre estos cimientos</span>
          </h2>
          <p className="text-[#E8F0FE]/60 max-w-xl mx-auto">
            Cuatro pilares que guían cada acción, cada programa y cada sueño que hacemos realidad.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => (
            <div key={p.title} data-reveal>
              <Card glowColor={p.color} className="h-full text-center group cursor-default">
                <div
                  className={`w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center text-3xl bg-gradient-to-br ${p.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {p.icon}
                </div>
                <h3 className="font-orbitron font-bold text-white text-lg mb-3">{p.title}</h3>
                <p className="text-[#E8F0FE]/60 text-sm leading-relaxed">{p.desc}</p>
                <div className="mt-4 h-0.5 w-12 mx-auto rounded-full transition-all duration-300 group-hover:w-full"
                  style={{ background: `linear-gradient(to right, ${p.color}, transparent)` }} />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
