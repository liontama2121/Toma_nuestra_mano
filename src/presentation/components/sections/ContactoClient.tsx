'use client';

import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Card } from '../ui/Card';

const items = [
  {
    icon: '📍',
    label: 'Dirección',
    value: 'Calle 100 No. 8A-55, Torre C, Oficina 408, Bogotá D.C., Colombia',
    color: '#0A2472',
    href: 'https://www.google.com/maps/search/?api=1&query=Calle+100+8A-55+Bogota',
  },
  {
    icon: '📞',
    label: 'Teléfonos',
    value: '+57 310 666 9875 · +57 300 291 3313',
    color: '#43A047',
    href: 'tel:+573106669875',
  },
  {
    icon: '💬',
    label: 'WhatsApp',
    value: '+57 310 666 9875',
    color: '#2E7D32',
    href: 'https://wa.me/573106669875',
  },
  {
    icon: '✉️',
    label: 'Correo electrónico',
    value: '[PENDIENTE_CONFIRMAR_CORREO]',
    color: '#7B1FA2',
    href: null,
  },
  {
    icon: '🕒',
    label: 'Horario',
    value: 'Lunes a Viernes · 8:00 a.m. – 5:00 p.m.',
    color: '#F57C00',
    href: null,
  },
  {
    icon: '🌐',
    label: 'Redes sociales',
    value: 'Facebook · Instagram · TikTok · X',
    color: '#1565C0',
    href: 'https://www.facebook.com/fundacion.tomanuestramano',
  },
];

export function ContactoClient() {
  const ref = useScrollReveal(100) as React.RefObject<HTMLDivElement>;

  return (
    <section className="relative pt-32 pb-24">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 0%, rgba(245,124,0,0.08) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <p className="text-[#FFC107] text-sm font-bold tracking-widest uppercase mb-3">Contacto</p>
          <h1 className="font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Hablemos de
            <span className="bg-gradient-to-r from-[#FFC107] to-[#F57C00] bg-clip-text text-transparent"> transformar vidas</span>
          </h1>
          <p className="text-[#E8F0FE]/60 max-w-2xl mx-auto">
            Sumate, vincula tu empresa o cuéntanos cómo podemos colaborar. Estamos en Bogotá pero trabajamos a nivel nacional.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it) => {
            const inner = (
              <Card glowColor={it.color} className="h-full flex flex-col gap-3 group">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${it.color}25`, border: `1px solid ${it.color}50` }}
                >
                  {it.icon}
                </div>
                <p className="text-[#E8F0FE]/40 text-xs uppercase tracking-widest font-bold">{it.label}</p>
                <p className="text-white text-sm leading-relaxed">{it.value}</p>
              </Card>
            );
            return (
              <div key={it.label} data-reveal>
                {it.href ? (
                  <a href={it.href} target={it.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="block h-full">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#E8F0FE]/50 text-xs">
            Fundación Toma Nuestra Mano Para Tu Desarrollo Social Integral · NIT 900.363.058-9 · Bogotá D.C., Colombia
          </p>
        </div>
      </div>
    </section>
  );
}
