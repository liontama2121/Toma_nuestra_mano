import { getImpactStatsUseCase } from '@/lib/di';
import { ImpactCounterClient } from './ImpactCounterClient';

export async function ImpactSection() {
  const stats = await getImpactStatsUseCase.execute();

  return (
    <section id="impacto" className="relative py-24">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(10,36,114,0.15), transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#FFC107] text-sm font-bold tracking-widest uppercase mb-3 font-orbitron">Nuestro Impacto</p>
          <h2 className="font-orbitron font-black text-3xl sm:text-4xl lg:text-5xl text-white">
            Números que
            <span className="bg-gradient-to-r from-[#FFC107] to-[#F57C00] bg-clip-text text-transparent"> hablan</span>
          </h2>
        </div>

        <ImpactCounterClient stats={stats} />
      </div>
    </section>
  );
}
