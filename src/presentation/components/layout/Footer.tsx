'use client';

import Image from 'next/image';
import { FaInstagram, FaFacebook, FaTiktok, FaXTwitter } from 'react-icons/fa6';

export function Footer() {
  return (
    <footer className="bg-[#020918] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="Logo" width={130} height={72} className="object-contain" />
              <div>
                <p className="text-white font-bold text-sm">Toma Nuestra Mano</p>
                <p className="text-[#FFC107] text-xs">Hagámoslo Hoy</p>
              </div>
            </div>
            <p className="text-[#E8F0FE]/60 text-sm leading-relaxed">
              Fundación colombiana sin ánimo de lucro, comprometida con el desarrollo social integral de niños y jóvenes.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4  text-sm">Información Legal</h4>
            <ul className="space-y-2 text-[#E8F0FE]/60 text-xs leading-relaxed">
              <li>FUNDACION TOMA NUESTRA MANO PARA TU DESARROLLO SOCIAL INTEGRAL</li>
              <li>Constituida: Acta No. 1 — 2 de junio de 2010</li>
              <li>Cámara de Comercio, Libro I, No. 00174393</li>
              <li>Vigilada por la Alcaldía Mayor de Bogotá</li>
              <li>Bogotá D.C., Colombia</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Síguenos</h4>
            <div className="flex items-center gap-3">
              {[
                { icon: FaInstagram, href: '#', label: 'Instagram' },
                { icon: FaFacebook, href: 'https://www.facebook.com/fundacion.tomanuestramano', label: 'Facebook' },
                { icon: FaTiktok, href: '#', label: 'TikTok' },
                { icon: FaXTwitter, href: '#', label: 'X (Twitter)' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href !== '#' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group w-10 h-10 rounded-full border border-[#FFC107]/50 flex items-center justify-center text-[#FFC107] hover:border-[#FFC107] hover:scale-110 hover:shadow-[0_0_12px_rgba(255,193,7,0.4)] transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <div className="mt-5">
              <p className="text-[#E8F0FE]/40 text-xs">Objeto social: beneficencia, bienestar común, mejoramiento de calidad de vida, interés social científico, tecnológico, cultural, recreativo y servicio social — a nivel nacional e internacional.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-[#E8F0FE]/40 text-xs">
            © {new Date().getFullYear()} Fundación Toma Nuestra Mano — Todos los derechos reservados · Bogotá, Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
