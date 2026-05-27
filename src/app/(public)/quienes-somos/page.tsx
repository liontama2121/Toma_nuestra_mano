import type { Metadata } from 'next';
import { QuienesSomosClient } from '@/presentation/components/sections/QuienesSomosClient';

export const metadata: Metadata = {
  title: 'Quiénes Somos',
  description:
    'Conoce la historia, misión y visión de Fundación Toma Nuestra Mano Para Tu Desarrollo Social Integral — entidad sin ánimo de lucro colombiana desde 2010.',
};

const pageData = {
  mission:
    'Somos una fundación sin ánimo de lucro que trabaja por el bienestar y la calidad de vida de las comunidades más vulnerables de Colombia. Promovemos el desarrollo social integral a través de la educación, la salud, la cultura, el deporte y el apoyo a niños, niñas, jóvenes, familias y poblaciones en situación de vulnerabilidad.',
  vision:
    'Ser una fundación referente en Colombia por su impacto sostenible en el desarrollo social integral de comunidades vulnerables, articulando educación, salud, cultura, deporte y desarrollo productivo para transformar vidas.',
  history: [
    {
      year: '2010',
      title: 'Constitución',
      text: 'Constituida el 11 de junio de 2010 en Bogotá D.C. como Entidad Sin Ánimo de Lucro inscrita en Cámara de Comercio bajo el número S0037201.',
    },
    {
      year: 'Hoy',
      title: 'Operación',
      text: 'Operamos como ESAL bajo el Régimen Tributario Especial, vigilada por la Alcaldía Mayor de Bogotá, con sede en Calle 100 No. 8A-55, Torre C, Oficina 408.',
    },
  ],
};

export default function QuienesSomosPage() {
  return <QuienesSomosClient data={pageData} />;
}
