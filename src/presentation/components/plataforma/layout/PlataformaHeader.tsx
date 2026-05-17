'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useStudent } from '@/presentation/hooks/useStudent';
import { useAuth } from '@/presentation/hooks/useAuth';

export function PlataformaHeader() {
  const student = useStudent();
  const { logout, isAuthenticated } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
      style={{ background: 'rgba(5,8,22,0.9)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        <Link href="/plataforma" className="flex items-center gap-3 cursor-pointer">
          <Image src="/logo.png" alt="Toma Nuestra Mano" width={80} height={44} className="object-contain" />
          <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest border"
            style={{ color: 'var(--tnm-accent)', borderColor: 'var(--tnm-accent)', background: 'rgba(245,158,11,0.1)' }}>
            PLATAFORMA ESTUDIANTE
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {[
            { label: 'Inicio', href: '/plataforma' },
            { label: 'Mis cursos', href: '/plataforma' },
          ].map((l) => (
            <Link key={l.href} href={l.href}
              className="text-sm transition-colors duration-200 hover:text-[#F59E0B]"
              style={{ color: 'var(--tnm-text-muted)' }}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button aria-label="Notificaciones"
            className="p-2 rounded-full transition-colors duration-200 hover:bg-white/10 cursor-pointer"
            style={{ color: 'var(--tnm-text-muted)' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          {/* Avatar con menú de sesión */}
          <div className="relative group">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer"
              style={{ background: 'var(--tnm-pilar-mision)', border: '2px solid var(--tnm-accent)', color: '#fff' }}
              title={student.displayName}>
              {student.displayName.charAt(0)}
            </div>

            {/* Tooltip con nombre y opción de logout */}
            <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/10 bg-[#0A0E27]/95 backdrop-blur-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-50">
              <div className="px-4 py-3 border-b border-white/10">
                <p className="text-xs font-bold text-white truncate">{student.displayName}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--tnm-text-muted)' }}>Estudiante</p>
              </div>
              {isAuthenticated && (
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 text-xs transition-colors hover:text-[#F59E0B] cursor-pointer"
                  style={{ color: 'var(--tnm-text-muted)' }}
                >
                  Cerrar sesión
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
