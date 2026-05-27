import type { Metadata } from 'next';
import Link from 'next/link';
import { programRepo, courseRepo } from '@/lib/di';
import { Card } from '@/presentation/components/ui/Card';
import { Badge } from '@/presentation/components/ui/Badge';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Cursos',
  description:
    'Catálogo de cursos de Fundación Toma Nuestra Mano: Misión Espacial, Programación para el Futuro, Muralismo Digital, Hábitos para una Vida Plena.',
};

export default async function CursosPage() {
  const programs = await programRepo.getAll();
  const programsWithCourses = await Promise.all(
    programs.map(async (program) => ({
      program,
      courses: await courseRepo.getByProgramId(program.id),
    })),
  );

  return (
    <section className="relative pt-32 pb-24">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(255,193,7,0.08) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <p className="text-[#FFC107] text-sm font-bold tracking-widest uppercase mb-3">Catálogo de Cursos</p>
          <h1 className="font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Aprende.
            <span className="bg-gradient-to-r from-[#FFC107] to-[#F57C00] bg-clip-text text-transparent"> Crece. </span>
            Transforma.
          </h1>
          <p className="text-[#E8F0FE]/60 max-w-2xl mx-auto mb-6">
            Cursos gratuitos organizados por programa. Cada curso incluye varias secciones con video y certificación.
          </p>
          <Link
            href="/plataforma"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FFC107] to-[#F57C00] text-[#050D2E] font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_24px_rgba(255,193,7,0.35)]"
          >
            Ir a la plataforma →
          </Link>
        </div>

        <div className="space-y-16">
          {programsWithCourses.map(({ program, courses }) => (
            <div key={program.id}>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: `${program.color}20`, border: `1px solid ${program.color}40` }}
                >
                  {program.icon}
                </div>
                <div>
                  <h2 className="font-black text-2xl text-white">{program.title}</h2>
                  <p className="text-[#E8F0FE]/50 text-sm">{program.description}</p>
                </div>
              </div>

              {courses.length === 0 ? (
                <p className="text-[#E8F0FE]/40 text-sm italic pl-2">Cursos próximamente.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courses.map((course) => (
                    <Card key={course.id} glowColor={program.color} className="flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-bold text-white text-lg">{course.title}</h3>
                        <Badge color={program.accentColor}>{course.sections.length} secciones</Badge>
                      </div>
                      <p className="text-[#E8F0FE]/60 text-sm leading-relaxed">{course.description}</p>

                      <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#E8F0FE]/50">
                        <span className="inline-flex items-center gap-1">
                          ⏱ {course.estimatedMinutes} min
                        </span>
                        <span className="inline-flex items-center gap-1">
                          🎬 Video por sección
                        </span>
                        <span className="inline-flex items-center gap-1">
                          🏅 Certificado al 100%
                        </span>
                      </div>

                      <details className="mt-2 group">
                        <summary className="cursor-pointer text-[#FFC107] text-xs font-semibold hover:underline list-none">
                          Ver secciones ▾
                        </summary>
                        <ol className="mt-3 space-y-2 text-sm text-[#E8F0FE]/70 list-decimal pl-5">
                          {course.sections.map((s) => (
                            <li key={s.id}>
                              <span className="text-white">{s.title}</span>
                              <p className="text-[#E8F0FE]/50 text-xs">{s.description}</p>
                            </li>
                          ))}
                        </ol>
                      </details>

                      <Link
                        href={`/plataforma/programa/${program.id}/curso/${course.id}/seccion/1`}
                        className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all hover:scale-[1.02]"
                        style={{
                          borderColor: `${program.color}80`,
                          color: '#fff',
                          background: `${program.color}30`,
                        }}
                      >
                        Comenzar curso →
                      </Link>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
