/**
 * Tests para el hook useAuth
 *
 * Para ejecutar: npx jest
 */

import { renderHook } from '@testing-library/react';
import React from 'react';
import { AuthContext, AuthContextValue } from '@/presentation/context/AuthContext';
import { useAuth } from '@/presentation/hooks/useAuth';

const mockAuthValue: AuthContextValue = {
  user: { id: 'u1', displayName: 'Carlos López', email: 'carlos@test.com', roles: ['estudiante'] },
  status: 'authenticated',
  roles: ['estudiante'],
  isAuthenticated: true,
  error: null,
  login: jest.fn(),
  logout: jest.fn(),
  hasRole: (role: string) => role === 'estudiante',
};

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={mockAuthValue}>
      {children}
    </AuthContext.Provider>
  );
}

describe('useAuth()', () => {
  it('expone el usuario autenticado desde el contexto', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });
    expect(result.current.user?.displayName).toBe('Carlos López');
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('retorna los roles del usuario', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });
    expect(result.current.roles).toContain('estudiante');
  });

  it('hasRole() retorna true para un rol válido', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });
    expect(result.current.hasRole('estudiante')).toBe(true);
  });

  it('hasRole() retorna false para un rol que no tiene', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });
    expect(result.current.hasRole('admin')).toBe(false);
  });

  it('expone funciones de login y logout', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper });
    expect(typeof result.current.login).toBe('function');
    expect(typeof result.current.logout).toBe('function');
  });
});
