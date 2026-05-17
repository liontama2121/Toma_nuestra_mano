'use client';

import { useEffect, useRef, useState, useCallback, ReactNode } from 'react';
import { AuthContext, AuthStatus, AuthContextValue } from '@/presentation/context/AuthContext';
import { KeycloakAuthRepository } from '@/infrastructure/auth/KeycloakAuthRepository';
import { AuthUser } from '@/domain/entities/AuthUser';
import { getKeycloak, isKeycloakConfigured } from '@/lib/keycloak';
import { MOCK_USERS, findMockUser } from '@/lib/mockUsers';

// Repositorio singleton para toda la sesión
const authRepo = new KeycloakAuthRepository();

// Intervalo de refresh: cada 4 minutos (tokens suelen expirar en 5)
const REFRESH_INTERVAL_MS = 4 * 60 * 1000;

interface AuthProviderProps {
  children: ReactNode;
  // Si true, redirige automáticamente a Keycloak si no hay sesión
  requireAuth?: boolean;
}

export function AuthProvider({ children, requireAuth = false }: AuthProviderProps) {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const refreshTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Detiene el intervalo de refresh
  const stopRefresh = useCallback(() => {
    if (refreshTimer.current) {
      clearInterval(refreshTimer.current);
      refreshTimer.current = null;
    }
  }, []);

  // Inicia el refresh automático del token
  const startRefresh = useCallback(() => {
    stopRefresh();
    refreshTimer.current = setInterval(async () => {
      const ok = await authRepo.refreshToken();
      if (!ok) {
        // Sesión expirada: limpia estado y redirige si es necesario
        setStatus('unauthenticated');
        setUser(null);
        stopRefresh();
      }
    }, REFRESH_INTERVAL_MS);
  }, [stopRefresh]);

  // Inicializa Keycloak al montar
  useEffect(() => {
    // Modo desarrollo: restaura sesión desde localStorage si existe
    if (!isKeycloakConfigured()) {
      const saved = localStorage.getItem('tnm-mock-user');
      if (saved) {
        try {
          setUser(JSON.parse(saved));
          setStatus('authenticated');
        } catch {
          localStorage.removeItem('tnm-mock-user');
          setStatus('unauthenticated');
        }
      } else {
        setStatus('unauthenticated');
      }
      return;
    }

    const kc = getKeycloak();

    kc.onTokenExpired = () => {
      authRepo.refreshToken().catch(() => {
        setStatus('unauthenticated');
        setUser(null);
      });
    };

    kc.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      pkceMethod: 'S256',
      checkLoginIframe: false,
    })
      .then((authenticated) => {
        if (authenticated) {
          const authUser = authRepo.getUser();
          setUser(authUser);
          setStatus('authenticated');
          authRepo.setSessionCookie();
          startRefresh();
        } else {
          setStatus('unauthenticated');
          if (requireAuth) {
            // Redirige automáticamente a Keycloak
            authRepo.login().catch(() => setError('No se pudo conectar con el servidor de autenticación.'));
          }
        }
      })
      .catch(() => {
        setError('Error al conectar con el servidor de autenticación. Intenta más tarde.');
        setStatus('error');
      });

    return () => stopRefresh();
  }, [requireAuth, startRefresh, stopRefresh]);

  const login = useCallback(async (email?: string, password?: string) => {
    try {
      setError(null);

      // Modo desarrollo: valida credenciales contra usuarios mock
      if (!isKeycloakConfigured()) {
        await new Promise((r) => setTimeout(r, 800));

        // Sin credenciales usa el primer usuario por defecto
        if (!email || !password) {
          const defaultUser = MOCK_USERS[0];
          document.cookie = 'tnm-session=1; path=/; SameSite=Lax; max-age=86400';
          setUser(defaultUser);
          setStatus('authenticated');
          window.location.href = '/plataforma';
          return;
        }

        const found = findMockUser(email, password);
        if (!found) {
          setError('Correo o contraseña incorrectos.');
          return;
        }

        localStorage.setItem('tnm-mock-user', JSON.stringify(found));
        document.cookie = 'tnm-session=1; path=/; SameSite=Lax; max-age=86400';
        setUser(found);
        setStatus('authenticated');
        window.location.href = '/plataforma';
        return;
      }

      await authRepo.login(`${window.location.origin}/auth/callback`);
    } catch {
      setError('No se pudo iniciar sesión. Verifica tu conexión e intenta de nuevo.');
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      stopRefresh();
      localStorage.removeItem('tnm-mock-user');
      document.cookie = 'tnm-session=; path=/; max-age=0';
      setUser(null);
      setStatus('unauthenticated');
      if (!isKeycloakConfigured()) {
        window.location.href = '/auth/login';
        return;
      }
      await authRepo.logout(`${window.location.origin}`);
    } catch {
      setError('Ocurrió un error al cerrar sesión.');
    }
  }, [stopRefresh]);

  const hasRole = useCallback(
    (role: string) => user?.roles.includes(role) ?? false,
    [user]
  );

  const value: AuthContextValue = {
    user,
    status,
    roles: user?.roles ?? [],
    isAuthenticated: status === 'authenticated',
    error,
    login: login as AuthContextValue['login'],
    logout,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
