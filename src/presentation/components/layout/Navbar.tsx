'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll } from 'framer-motion';

const links = [
  { label: 'Inicio', href: '/' },
  { label: 'Quiénes Somos', href: '/quienes-somos' },
  { label: 'Qué Hacemos', href: '/que-hacemos' },
  { label: 'Programas', href: '/programas' },
  { label: 'Cursos', href: '/cursos' },
  { label: 'Contacto', href: '/contacto' },
  { label: 'Transparencia', href: '/transparencia' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useEffect(() => {
    return scrollY.on('change', (v) => setScrolled(v > 50));
  }, [scrollY]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: scrolled || pathname !== '/' ? 'blur(20px)' : 'none',
        backgroundColor: scrolled || pathname !== '/' ? 'rgba(5,13,46,0.85)' : 'transparent',
        borderBottom: scrolled || pathname !== '/' ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Fundación Toma Nuestra Mano"
              width={120}
              height={67}
              className="object-contain"
            />
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm leading-tight">Toma Nuestra Mano</p>
              <p className="text-[#FFC107] text-xs">Hagámoslo Hoy</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    active ? 'text-[#FFC107]' : 'text-[#E8F0FE] hover:text-[#FFC107]'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {l.label}
                  {active && (
                    <span className="block h-0.5 mt-1 bg-[#FFC107] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/plataforma"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#FFC107] to-[#F57C00] text-[#050D2E] text-sm font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,193,7,0.35)]"
            >
              Iniciar sesión
            </Link>
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span className={`block h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`block py-3 font-medium transition-colors ${
                    active ? 'text-[#FFC107]' : 'text-[#E8F0FE] hover:text-[#FFC107]'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              href="/plataforma"
              className="mt-4 flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFC107] to-[#F57C00] text-[#050D2E] text-sm font-bold shadow-[0_0_20px_rgba(255,193,7,0.35)]"
            >
              Iniciar sesión
            </Link>
          </div>
        )}
      </div>
    </motion.nav>
  );
}
