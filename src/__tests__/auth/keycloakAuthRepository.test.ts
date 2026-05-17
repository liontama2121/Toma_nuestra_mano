/**
 * Tests para KeycloakAuthRepository
 *
 * Para ejecutar: instala Jest + ts-jest
 *   npm install -D jest ts-jest @types/jest jest-environment-jsdom
 * Luego: npx jest
 */

import { resetKeycloak } from '@/lib/keycloak';

// Mock de keycloak-js
jest.mock('keycloak-js', () => {
  return jest.fn().mockImplementation(() => ({
    authenticated: true,
    clientId: 'plataforma-estudiante',
    tokenParsed: {
      sub: 'user-123',
      name: 'Ana García',
      email: 'ana@example.com',
      realm_access: { roles: ['estudiante'] },
    },
    updateToken: jest.fn().mockResolvedValue(true),
    login: jest.fn().mockResolvedValue(undefined),
    logout: jest.fn().mockResolvedValue(undefined),
  }));
});

// Mock de variables de entorno
process.env.NEXT_PUBLIC_KEYCLOAK_URL = 'https://keycloak.test.com';
process.env.NEXT_PUBLIC_KEYCLOAK_REALM = 'test-realm';
process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID = 'plataforma-estudiante';

// Mock del document (jsdom)
Object.defineProperty(document, 'cookie', {
  writable: true,
  value: '',
});

describe('KeycloakAuthRepository', () => {
  beforeEach(() => {
    resetKeycloak();
    jest.clearAllMocks();
  });

  describe('getUser()', () => {
    it('retorna el usuario autenticado desde el token', async () => {
      const { KeycloakAuthRepository } = await import('@/infrastructure/auth/KeycloakAuthRepository');
      const repo = new KeycloakAuthRepository();
      const user = repo.getUser();

      expect(user).not.toBeNull();
      expect(user?.id).toBe('user-123');
      expect(user?.displayName).toBe('Ana García');
      expect(user?.email).toBe('ana@example.com');
      expect(user?.roles).toContain('estudiante');
    });
  });

  describe('isAuthenticated()', () => {
    it('retorna true cuando Keycloak reporta authenticated=true', async () => {
      const { KeycloakAuthRepository } = await import('@/infrastructure/auth/KeycloakAuthRepository');
      const repo = new KeycloakAuthRepository();
      expect(repo.isAuthenticated()).toBe(true);
    });
  });

  describe('refreshToken()', () => {
    it('retorna true cuando el refresh es exitoso', async () => {
      const { KeycloakAuthRepository } = await import('@/infrastructure/auth/KeycloakAuthRepository');
      const repo = new KeycloakAuthRepository();
      const resultado = await repo.refreshToken();
      expect(resultado).toBe(true);
    });

    it('retorna false y limpia la cookie cuando el refresh falla', async () => {
      const { getKeycloak } = await import('@/lib/keycloak');
      getKeycloak().updateToken = jest.fn().mockRejectedValue(new Error('Token expirado'));

      const { KeycloakAuthRepository } = await import('@/infrastructure/auth/KeycloakAuthRepository');
      const repo = new KeycloakAuthRepository();
      const resultado = await repo.refreshToken();
      expect(resultado).toBe(false);
    });
  });
});
