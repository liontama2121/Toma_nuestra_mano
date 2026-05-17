'use client';

import { IAuthRepository } from '@/domain/repositories/IAuthRepository';
import { AuthUser } from '@/domain/entities/AuthUser';
import { getKeycloak } from '@/lib/keycloak';

// Nombre de la cookie que usa el middleware para verificar sesión
const SESSION_COOKIE = 'tnm-session';

function setSessionCookie(): void {
  // Cookie de sesión: no httpOnly (se establece desde JS), SameSite=Lax
  document.cookie = `${SESSION_COOKIE}=1; path=/; SameSite=Lax; max-age=86400`;
}

function clearSessionCookie(): void {
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0`;
}

export class KeycloakAuthRepository implements IAuthRepository {
  async login(redirectUri?: string): Promise<void> {
    const uri = redirectUri ?? `${window.location.origin}/auth/callback`;
    await getKeycloak().login({ redirectUri: uri });
  }

  async logout(redirectUri?: string): Promise<void> {
    // Limpia la cookie antes de redirigir a Keycloak
    clearSessionCookie();
    const uri = redirectUri ?? `${window.location.origin}`;
    await getKeycloak().logout({ redirectUri: uri });
  }

  getUser(): AuthUser | null {
    const kc = getKeycloak();
    if (!kc.authenticated || !kc.tokenParsed) return null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const token = kc.tokenParsed as any;

    return {
      id: token.sub ?? '',
      displayName: token.name ?? token.preferred_username ?? 'Estudiante',
      email: token.email ?? '',
      // Combina roles del realm y del cliente
      roles: [
        ...(token.realm_access?.roles ?? []),
        ...(token.resource_access?.[kc.clientId!]?.roles ?? []),
      ],
    };
  }

  isAuthenticated(): boolean {
    return getKeycloak().authenticated ?? false;
  }

  async refreshToken(): Promise<boolean> {
    try {
      // Renueva el token si expira en menos de 30 segundos
      const refreshed = await getKeycloak().updateToken(30);
      if (refreshed) setSessionCookie(); // Renueva también la cookie
      return refreshed;
    } catch {
      // Token inválido o sesión expirada
      clearSessionCookie();
      return false;
    }
  }

  setSessionCookie(): void {
    setSessionCookie();
  }
}
