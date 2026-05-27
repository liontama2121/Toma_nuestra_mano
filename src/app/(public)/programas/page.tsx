import type { Metadata } from 'next';
import { ProgramsSection } from '@/presentation/components/sections/ProgramsSection';

export const metadata: Metadata = {
  title: 'Programas',
  description:
    'Programas de Fundación Toma Nuestra Mano: Misión Espacial Colombia, Desarrollo Digital, Arte y Cultura, Bienestar Comunitario.',
};

export default function ProgramasPage() {
  return (
    <div className="pt-24">
      <ProgramsSection />
    </div>
  );
}
