import { getDonationAmountsUseCase } from '@/lib/di';
import { DonationClient } from './DonationClient';

export async function DonationSection() {
  const amounts = await getDonationAmountsUseCase.execute();

  return (
    <section id="donacion" className="relative py-24">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245,124,0,0.08) 0%, transparent 70%)' }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[#FFC107] text-sm font-bold tracking-widest uppercase mb-3 ">Haz la Diferencia</p>
        <h2 className="font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
          Tu donación
          <span className="bg-gradient-to-r from-[#FFC107] to-[#F57C00] bg-clip-text text-transparent"> cambia vidas</span>
        </h2>
        <p className="text-[#E8F0FE]/60 mb-12 max-w-xl mx-auto">
          Cada peso que aportas llega directamente a niños y jóvenes colombianos, financiando programas de tecnología, educación y bienestar.
        </p>

        <DonationClient amounts={amounts} />

        <p className="mt-8 text-[#E8F0FE]/40 text-xs">
          Fundación sin ánimo de lucro · Tus aportes son deducibles de impuestos · Cámara de Comercio No. 00174393
        </p>
      </div>
    </section>
  );
}
