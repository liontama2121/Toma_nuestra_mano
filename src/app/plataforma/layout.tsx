import { AuthProvider } from '@/presentation/components/auth/AuthProvider';
import { AuthGuard } from '@/presentation/components/auth/AuthGuard';
import { PlataformaShell } from '@/presentation/components/plataforma/layout/PlataformaShell';

export const metadata = {
  title: 'Plataforma Estudiante — Toma Nuestra Mano',
};

export default function PlataformaLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthGuard>
        <PlataformaShell>{children}</PlataformaShell>
      </AuthGuard>
    </AuthProvider>
  );
}
