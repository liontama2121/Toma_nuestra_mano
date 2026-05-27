'use client';

import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Card } from '../ui/Card';

type Row = { label: string; value: string; color: string };

export function TransparenciaClient({ data }: { data: Row[] }) {
  const ref = useScrollReveal(80) as React.RefObject<HTMLDivElement>;

  return (
    <section className="relative pt-32 pb-24">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(123,31,162,0.08) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <p className="text-[#FFC107] text-sm font-bold tracking-widest uppercase mb-3">Transparencia</p>
          <h1 className="font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Datos
            <span className="bg-gradient-to-r from-[#7B1FA2] to-[#FFC107] bg-clip-text text-transparent"> legales y públicos</span>
          </h1>
          <p className="text-[#E8F0FE]/60 max-w-2xl mx-auto">
            Información oficial registrada en la Cámara de Comercio de Bogotá y ante la DIAN como Entidad Sin Ánimo de Lucro del Régimen Tributario Especial.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.map((row) => (
            <div key={row.label} data-reveal>
              <Card glowColor={row.color} className="h-full">
                <p className="text-[#E8F0FE]/40 text-xs uppercase tracking-widest font-bold mb-2">{row.label}</p>
                <p className="text-white font-semibold text-base leading-snug">{row.value}</p>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
          <h2 className="text-white font-bold text-lg mb-3">Objeto social</h2>
          <p className="text-[#E8F0FE]/70 text-sm leading-relaxed">
            Beneficencia, bienestar común, mejoramiento de calidad de vida, interés social
            científico, tecnológico, cultural, recreativo y servicio social — a nivel
            nacional e internacional. Conforme al certificado de existencia y representación
            legal expedido por la Cámara de Comercio de Bogotá.
          </p>
        </div>

        <div className="mt-6 p-6 rounded-2xl border border-[#FFC107]/30 bg-[#FFC107]/[0.05]">
          <h2 className="text-[#FFC107] font-bold text-sm tracking-widest uppercase mb-3">Estados financieros y rendición de cuentas</h2>
          <p className="text-[#E8F0FE]/70 text-sm leading-relaxed">
            Los estados financieros, declaraciones tributarias y memorias económicas se
            encuentran disponibles para consulta de donantes y autoridades competentes.
            Solicítalos al correo de contacto.
          </p>
        </div>
      </div>
    </section>
  );
}
