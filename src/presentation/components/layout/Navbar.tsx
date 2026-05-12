'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll } from 'framer-motion';
import { Button } from '../ui/Button';

const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Pilares', href: '#pilares' },
  { label: 'Misión', href: '#mision' },
  { label: 'Programas', href: '#programas' },
  { label: 'Impacto', href: '#impacto' },
  { label: 'Videos', href: '#videos' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (v) => setScrolled(v > 50));
  }, [scrollY]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        backgroundColor: scrolled ? 'rgba(5,13,46,0.85)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#inicio" className="flex items-center gap-3">
            <Image
              src="/logo_png.png"
              alt="Fundación Toma Nuestra Mano"
              width={44}
              height={44}
              className="rounded-full"
            />
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm leading-tight">Toma Nuestra Mano</p>
              <p className="text-[#FFC107] text-xs">Hagámoslo Hoy</p>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[#E8F0FE] hover:text-[#FFC107] text-sm font-medium transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button size="sm" className="hidden sm:inline-flex" onClick={() => document.getElementById('donacion')?.scrollIntoView({ behavior: 'smooth' })}>
              ¡Únete Hoy!
            </Button>
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
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="block py-3 text-[#E8F0FE] hover:text-[#FFC107] font-medium transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <Button size="sm" className="mt-4 w-full">¡Únete Hoy!</Button>
          </div>
        )}
      </div>
    </motion.nav>
  );
}
