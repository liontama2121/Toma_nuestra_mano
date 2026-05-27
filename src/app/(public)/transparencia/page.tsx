import type { Metadata } from 'next';
import { TransparenciaClient } from '@/presentation/components/sections/TransparenciaClient';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Transparencia',
  description:
    'Datos legales y de transparencia de Fundación Toma Nuestra Mano: NIT 900.363.058-9, ESAL inscripción CCB S0037201, Régimen Tributario Especial, vigilada por la Alcaldía Mayor de Bogotá.',
};

const legalData = [
  {
    label: 'Razón social',
    value: 'Fundación Toma Nuestra Mano Para Tu Desarrollo Social Integral',
    color: '#0A2472',
  },
  { label: 'Nombre corto', value: 'Fundación Toma Nuestra Mano', color: '#1565C0' },
  { label: 'NIT', value: '900.363.058-9', color: '#7B1FA2' },
  { label: 'Tipo de entidad', value: 'Entidad Sin Ánimo de Lucro (ESAL)', color: '#43A047' },
  { label: 'Régimen tributario', value: 'Régimen Tributario Especial', color: '#2E7D32' },
  { label: 'Fecha de constitución', value: '11 de junio de 2010', color: '#F57C00' },
  { label: 'Inscripción CCB', value: 'S0037201', color: '#FFC107' },
  { label: 'Domicilio', value: 'Bogotá D.C., Colombia', color: '#AB47BC' },
  { label: 'Vigilancia', value: 'Alcaldía Mayor de Bogotá', color: '#0A2472' },
];

export default function TransparenciaPage() {
  return <TransparenciaClient data={legalData} />;
}
