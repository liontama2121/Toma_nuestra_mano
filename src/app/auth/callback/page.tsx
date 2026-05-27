'use client';

export const runtime = 'edge';

// Esta página recibe el redirect de Keycloak después del login.
// keycloak-js procesa automáticamente el `code` y `state` de la URL
// cuando se llama a keycloak.init().

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/presentation/hooks/useAuth';
import { AuthProvider } from '@/presentation/components/auth/AuthProvider';

function CallbackInner() {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      // Autenticación exitosa: redirige al dashboard
      router.replace('/plataforma');
    } else if (status === 'unauthenticated' || status === 'error') {
      // Algo salió mal: vuelve al login
      router.replace('/auth/login');
    }
  }, [status, router]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'var(--tnm-bg-deep)' }}
    >
      <div className="text-center">
        <div className="inline-block w-10 h-10 border-2 border-[#F59E0B] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm" style={{ color: 'var(--tnm-text-muted)' }}>
          Completando inicio de sesión...
        </p>
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <AuthProvider requireAuth={false}>
      <CallbackInner />
    </AuthProvider>
  );
}
