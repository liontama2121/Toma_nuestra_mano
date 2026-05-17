/**
 * Tests para el middleware de protección de rutas
 *
 * Para ejecutar: npx jest
 */

import { NextRequest } from 'next/server';

// Mock de next/server
jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    next: jest.fn(() => ({ type: 'next' })),
    redirect: jest.fn((url: URL) => ({ type: 'redirect', url: url.toString() })),
  },
}));

// Importa después del mock
import { middleware } from '@/middleware';

function mockRequest(pathname: string, hasCookie = false): NextRequest {
  const url = `http://localhost:3000${pathname}`;
  return {
    nextUrl: { pathname },
    url,
    cookies: {
      has: jest.fn().mockReturnValue(hasCookie),
    },
  } as unknown as NextRequest;
}

describe('middleware — protección de rutas', () => {
  it('redirige a /auth/login si accede a /plataforma sin sesión', () => {
    const req = mockRequest('/plataforma', false);
    const res = middleware(req) as { type: string; url: string };
    expect(res.type).toBe('redirect');
    expect(res.url).toContain('/auth/login');
  });

  it('permite acceso a /plataforma con sesión activa', () => {
    const req = mockRequest('/plataforma', true);
    const res = middleware(req) as { type: string };
    expect(res.type).toBe('next');
  });

  it('redirige a /plataforma si accede a /auth/login con sesión activa', () => {
    const req = mockRequest('/auth/login', true);
    const res = middleware(req) as { type: string; url: string };
    expect(res.type).toBe('redirect');
    expect(res.url).toContain('/plataforma');
  });

  it('permite acceso a /auth/login sin sesión', () => {
    const req = mockRequest('/auth/login', false);
    const res = middleware(req) as { type: string };
    expect(res.type).toBe('next');
  });

  it('agrega returnTo en la URL de redirección al login', () => {
    const req = mockRequest('/plataforma/programa/mision-espacial', false);
    const res = middleware(req) as { type: string; url: string };
    expect(res.url).toContain('returnTo=');
  });
});
