import { NextRequest, NextResponse } from 'next/server';

// Rutas que requieren autenticación
const RUTAS_PROTEGIDAS = ['/plataforma'];

// Rutas de autenticación (no proteger, redirigir si ya está autenticado)
const RUTAS_AUTH = ['/auth/login'];

// Nombre de la cookie de sesión (debe coincidir con KeycloakAuthRepository)
const SESSION_COOKIE = 'tnm-session';

export function middleware(request: NextRequest) {
  // Modo desarrollo: sin Keycloak configurado, no aplica protección
  if (!process.env.NEXT_PUBLIC_KEYCLOAK_URL) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const sesionActiva = request.cookies.has(SESSION_COOKIE);

  // Si está en una ruta protegida y no tiene sesión → redirige al login
  const esRutaProtegida = RUTAS_PROTEGIDAS.some((ruta) => pathname.startsWith(ruta));
  if (esRutaProtegida && !sesionActiva) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('returnTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Si ya tiene sesión e intenta acceder al login → redirige al dashboard
  const esRutaAuth = RUTAS_AUTH.some((ruta) => pathname.startsWith(ruta));
  if (esRutaAuth && sesionActiva) {
    return NextResponse.redirect(new URL('/plataforma', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Aplica el middleware solo a rutas relevantes (excluye assets estáticos)
  matcher: ['/plataforma/:path*', '/auth/:path*'],
};
