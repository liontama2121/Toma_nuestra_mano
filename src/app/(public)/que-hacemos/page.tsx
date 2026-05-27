import type { Metadata } from 'next';
import { QueHacemosClient } from '@/presentation/components/sections/QueHacemosClient';

export const metadata: Metadata = {
  title: 'Qué Hacemos',
  description:
    'Áreas de trabajo de Fundación Toma Nuestra Mano: desarrollo social, educación, salud, cultura, deporte, medio ambiente y desarrollo productivo.',
};

const areas = [
  {
    icon: '🏘️',
    title: 'Desarrollo Social Comunitario',
    desc: 'Fortalecemos el tejido social de comunidades vulnerables mediante proyectos participativos y redes de apoyo.',
    color: '#0A2472',
    gradient: 'from-[#0A2472] to-[#1565C0]',
  },
  {
    icon: '📚',
    title: 'Educación y Formación',
    desc: 'Programas educativos y formativos para niños, niñas, jóvenes y familias, abriendo caminos al desarrollo personal y profesional.',
    color: '#F57C00',
    gradient: 'from-[#F57C00] to-[#FFC107]',
  },
  {
    icon: '🩺',
    title: 'Salud y Bienestar',
    desc: 'Iniciativas que promueven la salud física y mental, hábitos saludables y acceso a servicios para poblaciones vulnerables.',
    color: '#2E7D32',
    gradient: 'from-[#2E7D32] to-[#43A047]',
  },
  {
    icon: '🎨',
    title: 'Cultura y Arte',
    desc: 'Promoción de la expresión artística, cultural y patrimonial como vehículos de transformación e identidad.',
    color: '#7B1FA2',
    gradient: 'from-[#7B1FA2] to-[#AB47BC]',
  },
  {
    icon: '⚽',
    title: 'Deporte y Recreación',
    desc: 'Actividad física, recreación y deporte como herramientas de inclusión, disciplina y salud para niños y jóvenes.',
    color: '#1565C0',
    gradient: 'from-[#1565C0] to-[#42A5F5]',
  },
  {
    icon: '🌱',
    title: 'Medio Ambiente',
    desc: 'Educación ambiental, sostenibilidad y proyectos verdes que cuidan el entorno y a las comunidades que lo habitan.',
    color: '#43A047',
    gradient: 'from-[#43A047] to-[#81C784]',
  },
  {
    icon: '💼',
    title: 'Desarrollo Productivo y Empresarial',
    desc: 'Apoyo a emprendimientos, formación productiva y fortalecimiento de capacidades para la autosostenibilidad económica.',
    color: '#FFC107',
    gradient: 'from-[#FFC107] to-[#F57C00]',
  },
];

export default function QueHacemosPage() {
  return <QueHacemosClient areas={areas} />;
}
