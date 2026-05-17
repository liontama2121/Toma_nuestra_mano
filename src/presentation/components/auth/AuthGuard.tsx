'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/presentation/hooks/useAuth';

interface AuthGuardProps {
  children: ReactNode;
  // Rol mínimo requerido para acceder (opcional)
  requiredRole?: string;
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { status, isAuthenticated, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/auth/login');
    }
    if (status === 'authenticated' && requiredRole && !hasRole(requiredRole)) {
      router.replace('/auth/sin-permiso');
    }
  }, [status, isAuthenticated, requiredRole, hasRole, router]);

  // Estado de carga: spinner con diseño de la plataforma
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--tnm-bg-deep)' }}>
        <div className="text-center">
          <div className="inline-block w-10 h-10 border-2 border-[#F59E0B] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-sm" style={{ color: 'var(--tnm-text-muted)' }}>
            Verificando sesión...
          </p>
        </div>
      </div>
    );
  }

  // Estado de error
  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'var(--tnm-bg-deep)' }}>
        <div className="text-center max-w-sm">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-lg font-bold text-white mb-2">Error de autenticación</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--tnm-text-muted)' }}>
            No se pudo conectar con el servidor. Intenta recargar la página.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-[#F57C00] to-[#FFC107] text-[#050D2E] hover:scale-105 transition-transform"
          >
            Recargar
          </button>
        </div>
      </div>
    );
  }

  // Sin permiso para el rol requerido
  if (status === 'authenticated' && requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'var(--tnm-bg-deep)' }}>
        <div className="text-center max-w-sm">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-lg font-bold text-white mb-2">Acceso restringido</h2>
          <p className="text-sm" style={{ color: 'var(--tnm-text-muted)' }}>
            No tienes permisos para acceder a esta sección.
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
