'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/presentation/hooks/useAuth';
import { isKeycloakConfigured } from '@/lib/keycloak';

export function LoginView() {
  const { login, status, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email.trim() || !email.includes('@')) {
      setLocalError('Ingresa un correo electrónico válido.');
      return;
    }
    if (!password) {
      setLocalError('La contraseña es requerida.');
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
    } finally {
      setLoading(false);
    }
  };

  const mensajeError = localError ?? error;
  const cargando = loading || status === 'loading';

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--tnm-bg-deep)' }}
    >
      {/* Fondo decorativo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(245,158,11,0.07) 0%, transparent 70%)' }}
      />

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl p-8 backdrop-blur-md bg-white/5 border border-white/10">

          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <Image src="/logo.png" alt="Fundación Toma Nuestra Mano" width={76} height={76} className="object-contain mb-3" />
            <h1 className="text-xl font-black text-white text-center">Plataforma Estudiante</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--tnm-text-muted)' }}>Fundación Toma Nuestra Mano</p>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-white mb-1">¡Bienvenido de vuelta!</h2>
            <p className="text-sm" style={{ color: 'var(--tnm-text-muted)' }}>
              Ingresa tus datos para continuar tu aprendizaje.
            </p>
          </div>

          {/* Error */}
          {mensajeError && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {mensajeError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold mb-1.5 tracking-wide" style={{ color: 'var(--tnm-text-muted)' }}>
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setLocalError(null); }}
                required
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#F59E0B')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
              />
            </div>

            {/* Contraseña */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="text-xs font-bold tracking-wide" style={{ color: 'var(--tnm-text-muted)' }}>
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-xs transition-colors hover:text-[#F59E0B]"
                  style={{ color: 'var(--tnm-text-muted)' }}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setLocalError(null); }}
                required
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#F59E0B')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={cargando}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-base transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed bg-gradient-to-r from-[#F57C00] to-[#FFC107] text-[#050D2E] hover:shadow-[0_0_30px_rgba(255,193,7,0.5)] hover:scale-105 mt-1"
            >
              {cargando ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#050D2E] border-t-transparent rounded-full animate-spin" />
                  Ingresando...
                </>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>

          {/* Link a registro */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-sm" style={{ color: 'var(--tnm-text-muted)' }}>
              ¿No tienes cuenta?{' '}
              <Link href="/auth/register" className="font-bold text-[#F59E0B] hover:text-[#FFC107] transition-colors">
                Regístrate gratis
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-6 text-xs" style={{ color: 'var(--tnm-text-muted)' }}>
          <span className="text-[#F59E0B]">Toma Nuestra Mano</span> — Hagámoslo Hoy
        </p>
      </div>
    </div>
  );
}
