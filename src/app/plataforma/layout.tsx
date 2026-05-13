import { PlataformaShell } from '@/presentation/components/plataforma/layout/PlataformaShell';

export const metadata = {
  title: 'Plataforma Estudiante — Toma Nuestra Mano',
};

export default function PlataformaLayout({ children }: { children: React.ReactNode }) {
  return <PlataformaShell>{children}</PlataformaShell>;
}
