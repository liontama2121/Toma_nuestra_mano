import { Course } from '@/domain/entities/Course';
import { ICourseRepository } from '@/domain/repositories/ICourseRepository';

// Videos: /mision-espacial.mp4 para Misión Espacial, /backvideo.mp4 para los demás.
// Reemplazar por URLs reales cuando estén disponibles.
const courses: Course[] = [
  {
    id: 'curso-mision-espacial',
    programId: 'mision-espacial',
    title: 'Misión Espacial Colombia',
    description: 'Explora el universo y conviértete en el próximo científico espacial colombiano.',
    estimatedMinutes: 75,
    sections: [
      { id: 'me-s1', order: 1, title: '¿Qué hay allá arriba?', description: 'Introducción al universo: galaxias, estrellas y planetas.', videoUrl: '/mision-espacial.mp4', durationSeconds: 900 },
      { id: 'me-s2', order: 2, title: 'Gravedad y movimiento', description: 'Cómo se mueven los cuerpos en el espacio y por qué no caemos al sol.', videoUrl: '/mision-espacial.mp4', durationSeconds: 900 },
      { id: 'me-s3', order: 3, title: 'Astronomía aplicada', description: 'Telescopios, constelaciones y cómo observar el cielo desde Colombia.', videoUrl: '/mision-espacial.mp4', durationSeconds: 900 },
      { id: 'me-s4', order: 4, title: 'Diseña tu satélite', description: 'Componentes básicos de un satélite y cómo construir uno de papel.', videoUrl: '/mision-espacial.mp4', durationSeconds: 900 },
      { id: 'me-s5', order: 5, title: 'Misión cumplida', description: 'Recapitulación del viaje espacial y actividad final de misión.', videoUrl: '/mision-espacial.mp4', durationSeconds: 900 },
    ],
  },
  {
    id: 'curso-desarrollo-digital',
    programId: 'desarrollo-digital',
    title: 'Programación para el Futuro',
    description: 'Aprende los fundamentos de la programación y construye tu primer proyecto digital.',
    estimatedMinutes: 75,
    sections: [
      { id: 'dd-s1', order: 1, title: 'El lenguaje de las máquinas', description: 'Qué es el código y cómo hablan las computadoras entre sí.', videoUrl: 'https://www.youtube.com/watch?v=o4D744FMie8', durationSeconds: 900 },
      { id: 'dd-s2', order: 2, title: 'Variables y condiciones', description: 'Los bloques básicos de todo programa: guardar datos y tomar decisiones.', videoUrl: '/backvideo.mp4', durationSeconds: 900 },
      { id: 'dd-s3', order: 3, title: 'Bucles y funciones', description: 'Cómo repetir acciones y organizar el código en partes reutilizables.', videoUrl: '/backvideo.mp4', durationSeconds: 900 },
      { id: 'dd-s4', order: 4, title: 'Tu primera página web', description: 'HTML y CSS básicos para crear una página que el mundo pueda ver.', videoUrl: '/backvideo.mp4', durationSeconds: 900 },
      { id: 'dd-s5', order: 5, title: 'Proyecto final: Mi app', description: 'Integra todo lo aprendido en una mini-aplicación funcional.', videoUrl: '/backvideo.mp4', durationSeconds: 900 },
    ],
  },
  {
    id: 'curso-arte-cultura',
    programId: 'arte-cultura',
    title: 'Muralismo Digital',
    description: 'Transforma tu creatividad en arte digital con herramientas modernas.',
    estimatedMinutes: 75,
    sections: [
      { id: 'ac-s1', order: 1, title: 'Arte que transforma', description: 'Historia del muralismo latinoamericano y su poder de cambio social.', videoUrl: '/backvideo.mp4', durationSeconds: 900 },
      { id: 'ac-s2', order: 2, title: 'Composición y color', description: 'Principios de diseño visual: balance, contraste y paleta cromática.', videoUrl: '/backvideo.mp4', durationSeconds: 900 },
      { id: 'ac-s3', order: 3, title: 'Herramientas digitales', description: 'Introducción a software de ilustración gratuito para crear murales.', videoUrl: '/backvideo.mp4', durationSeconds: 900 },
      { id: 'ac-s4', order: 4, title: 'Tu mural en capas', description: 'Proceso creativo: boceto, capas, texturas y detalles finales.', videoUrl: '/backvideo.mp4', durationSeconds: 900 },
      { id: 'ac-s5', order: 5, title: 'Galería y exhibición', description: 'Comparte tu obra con la comunidad y recibe retroalimentación.', videoUrl: '/backvideo.mp4', durationSeconds: 900 },
    ],
  },
  {
    id: 'curso-bienestar',
    programId: 'bienestar-comunitario',
    title: 'Hábitos para una Vida Plena',
    description: 'Descubre cómo el bienestar físico y emocional es la base de todo logro.',
    estimatedMinutes: 75,
    sections: [
      { id: 'bc-s1', order: 1, title: 'El cuerpo en movimiento', description: 'Por qué el ejercicio diario cambia tu cerebro y tu ánimo.', videoUrl: '/backvideo.mp4', durationSeconds: 900 },
      { id: 'bc-s2', order: 2, title: 'Nutrición inteligente', description: 'Alimentos locales colombianos y cómo construir un plato saludable.', videoUrl: '/backvideo.mp4', durationSeconds: 900 },
      { id: 'bc-s3', order: 3, title: 'Mente sana', description: 'Técnicas de respiración, meditación corta y manejo del estrés.', videoUrl: '/backvideo.mp4', durationSeconds: 900 },
      { id: 'bc-s4', order: 4, title: 'Comunidad y apoyo', description: 'Redes de apoyo, empatía y cómo construir vínculos saludables.', videoUrl: '/backvideo.mp4', durationSeconds: 900 },
      { id: 'bc-s5', order: 5, title: 'Mi plan de bienestar', description: 'Diseña tu rutina personalizada para los próximos 30 días.', videoUrl: '/backvideo.mp4', durationSeconds: 900 },
    ],
  },
];

export class StaticCourseRepository implements ICourseRepository {
  async getByProgramId(programId: string): Promise<Course[]> {
    return courses.filter((c) => c.programId === programId);
  }

  async getById(courseId: string): Promise<Course | null> {
    return courses.find((c) => c.id === courseId) ?? null;
  }
}
