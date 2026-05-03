import { getProgramsUseCase } from '@/lib/di';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export async function ProgramsSection() {
  const programs = await getProgramsUseCase.execute();

  return (
    <section id="programas" className="relative py-24">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(123,31,162,0.1) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#FFC107] text-sm font-bold tracking-widest uppercase mb-3 font-orbitron">Lo Que Hacemos</p>
          <h2 className="font-orbitron font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Nuestros
            <span className="bg-gradient-to-r from-[#43A047] to-[#FFC107] bg-clip-text text-transparent"> Programas</span>
          </h2>
          <p className="text-[#E8F0FE]/60 max-w-xl mx-auto">
            Cada programa es un universo de posibilidades diseñado para despertar el potencial de niños y jóvenes colombianos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program) => (
            <Card key={program.id} glowColor={program.color} className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: `${program.color}20`, border: `1px solid ${program.color}40` }}
                >
                  {program.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-orbitron font-bold text-white text-lg mb-2">{program.title}</h3>
                  <p className="text-[#E8F0FE]/60 text-sm leading-relaxed">{program.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                {program.tags.map((tag) => (
                  <Badge key={tag} color={program.accentColor}>{tag}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
