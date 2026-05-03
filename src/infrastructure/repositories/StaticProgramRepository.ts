import { Program } from '@/domain/entities/Program';
import { IProgramRepository } from '@/domain/repositories/IProgramRepository';

const programs: Program[] = [
  {
    id: 'mision-espacial',
    title: 'Misión Espacial Colombia',
    description:
      'Programa insignia de ciencia y tecnología que lleva el universo a niños y jóvenes colombianos. Exploramos el cosmos para inspirar la próxima generación de científicos.',
    icon: '🚀',
    color: '#0A2472',
    accentColor: '#FFC107',
    tags: ['Ciencia', 'Tecnología', 'STEM'],
  },
  {
    id: 'desarrollo-digital',
    title: 'Desarrollo Digital',
    description:
      'Talleres de programación, robótica e inteligencia artificial para jóvenes. Construimos habilidades digitales que abren puertas al futuro.',
    icon: '💻',
    color: '#7B1FA2',
    accentColor: '#43A047',
    tags: ['Programación', 'Robótica', 'IA'],
  },
  {
    id: 'arte-cultura',
    title: 'Arte y Cultura',
    description:
      'Expresión creativa, música, danza y arte visual como herramientas de transformación social. El arte como lenguaje universal de cambio.',
    icon: '🎨',
    color: '#F57C00',
    accentColor: '#1565C0',
    tags: ['Arte', 'Cultura', 'Creatividad'],
  },
  {
    id: 'bienestar-comunitario',
    title: 'Bienestar Comunitario',
    description:
      'Programas de salud, nutrición y calidad de vida para comunidades vulnerables. Porque el bienestar es la base de todo desarrollo.',
    icon: '🤝',
    color: '#2E7D32',
    accentColor: '#F57C00',
    tags: ['Salud', 'Comunidad', 'Bienestar'],
  },
];

export class StaticProgramRepository implements IProgramRepository {
  async getAll(): Promise<Program[]> {
    return programs;
  }

  async getById(id: string): Promise<Program | null> {
    return programs.find((p) => p.id === id) ?? null;
  }
}
