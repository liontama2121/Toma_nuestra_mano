'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { isKeycloakConfigured } from '@/lib/keycloak';

interface Campo {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  autoComplete: string;
}

const CAMPOS: Campo[] = [
  { label: 'Nombre completo', id: 'nombre', type: 'text', placeholder: 'Ej: Ana García López', autoComplete: 'name' },
  { label: 'Correo electrónico', id: 'email', type: 'email', placeholder: 'tu@correo.com', autoComplete: 'email' },
  { label: 'Contraseña', id: 'password', type: 'password', placeholder: '••••••••', autoComplete: 'new-password' },
  { label: 'Confirmar contraseña', id: 'confirmPassword', type: 'password', placeholder: '••••••••', autoComplete: 'new-password' },
];

type Estado = 'idle' | 'loading' | 'success' | 'error';

export function RegisterView() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmPassword: '' });
  const [estado, setEstado] = useState<Estado>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (id: string, value: string) => {
    setForm((prev) => ({ ...prev, [id]: value }));
    setError(null);
  };

  const validar = (): string | null => {
    if (!form.nombre.trim()) return 'El nombre es requerido.';
    if (!form.email.includes('@')) return 'Ingresa un correo electrónico válido.';
    if (form.password.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
    if (form.password !== form.confirmPassword) return 'Las contraseñas no coinciden.';
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const mensajeError = validar();
    if (mensajeError) { setError(mensajeError); return; }

    setEstado('loading');
    setError(null);

    // Con Keycloak configurado: redirige al registro de Keycloak
    if (isKeycloakConfigured()) {
      const params = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!,
        response_type: 'code',
        scope: 'openid',
        redirect_uri: `${window.location.origin}/auth/callback`,
      });
      window.location.href = `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/registrations?${params}`;
      return;
    }

    // Modo desarrollo: simula creación de cuenta
    await new Promise((r) => setTimeout(r, 1200));
    setEstado('success');
  };

  // Pantalla de éxito
  if (estado === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--tnm-bg-deep)' }}>
        <div className="relative w-full max-w-md text-center">
          <div className="rounded-2xl p-10 backdrop-blur-md bg-white/5 border border-white/10">
            <div className="text-5xl mb-5">🎉</div>
            <h2 className="text-2xl font-black text-white mb-3">¡Cuenta creada!</h2>
            <p className="text-sm mb-8" style={{ color: 'var(--tnm-text-muted)' }}>
              Bienvenido a la plataforma, <span className="text-white font-bold">{form.nombre}</span>.
              Ya puedes iniciar sesión y comenzar tu aprendizaje.
            </p>
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-base bg-gradient-to-r from-[#F57C00] to-[#FFC107] text-[#050D2E] hover:shadow-[0_0_30px_rgba(255,193,7,0.5)] hover:scale-105 transition-all duration-300"
            >
              Iniciar sesión →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: 'var(--tnm-bg-deep)' }}>
      {/* Fondo decorativo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(245,158,11,0.07) 0%, transparent 70%)' }}
      />

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl p-8 backdrop-blur-md bg-white/5 border border-white/10">

          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <Image src="/logo.png" alt="Fundación Toma Nuestra Mano" width={70} height={70} className="object-contain mb-3" />
            <h1 className="text-xl font-black text-white text-center">Plataforma Estudiante</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--tnm-text-muted)' }}>Fundación Toma Nuestra Mano</p>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-white mb-1">Crear cuenta</h2>
            <p className="text-sm" style={{ color: 'var(--tnm-text-muted)' }}>
              Únete y empieza tu viaje de aprendizaje hoy.
            </p>
          </div>

          {/* Error general */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {CAMPOS.map((campo) => (
              <div key={campo.id}>
                <label
                  htmlFor={campo.id}
                  className="block text-xs font-bold mb-1.5 tracking-wide"
                  style={{ color: 'var(--tnm-text-muted)' }}
                >
                  {campo.label}
                </label>
                <input
                  id={campo.id}
                  type={campo.type}
                  placeholder={campo.placeholder}
                  autoComplete={campo.autoComplete}
                  value={form[campo.id as keyof typeof form]}
                  onChange={(e) => handleChange(campo.id, e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:border-[#F59E0B]"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#F59E0B')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={estado === 'loading'}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-base transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed bg-gradient-to-r from-[#F57C00] to-[#FFC107] text-[#050D2E] hover:shadow-[0_0_30px_rgba(255,193,7,0.5)] hover:scale-105 mt-2"
            >
              {estado === 'loading' ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#050D2E] border-t-transparent rounded-full animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                'Crear cuenta'
              )}
            </button>
          </form>

          {/* Link a login */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-sm" style={{ color: 'var(--tnm-text-muted)' }}>
              ¿Ya tienes cuenta?{' '}
              <Link href="/auth/login" className="font-bold text-[#F59E0B] hover:text-[#FFC107] transition-colors">
                Inicia sesión
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
