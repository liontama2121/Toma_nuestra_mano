'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaTiktok, FaXTwitter } from 'react-icons/fa6';

export function Footer() {
  return (
    <footer className="bg-[#020918] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="Fundación Toma Nuestra Mano" width={130} height={72} className="object-contain" />
              <div>
                <p className="text-white font-bold text-sm">Toma Nuestra Mano</p>
                <p className="text-[#FFC107] text-xs">Hagámoslo Hoy</p>
              </div>
            </div>
            <p className="text-[#E8F0FE]/60 text-sm leading-relaxed max-w-md">
              Fundación Toma Nuestra Mano Para Tu Desarrollo Social Integral.
              Entidad sin ánimo de lucro colombiana comprometida con el bienestar
              y desarrollo social integral de comunidades vulnerables.
            </p>

            <div className="mt-5 space-y-1 text-[#E8F0FE]/60 text-xs leading-relaxed">
              <p><span className="text-white/80 font-semibold">NIT:</span> 900.363.058-9</p>
              <p><span className="text-white/80 font-semibold">Dirección:</span> Calle 100 No. 8A-55, Torre C, Oficina 408, Bogotá D.C.</p>
              <p><span className="text-white/80 font-semibold">Tels:</span> +57 310 666 9875 · +57 300 291 3313</p>
              <p><span className="text-white/80 font-semibold">Correo:</span> [PENDIENTE_CONFIRMAR_CORREO]</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Navegación</h4>
            <ul className="space-y-2 text-[#E8F0FE]/60 text-xs">
              <li><Link href="/" className="hover:text-[#FFC107] transition-colors">Inicio</Link></li>
              <li><Link href="/quienes-somos" className="hover:text-[#FFC107] transition-colors">Quiénes Somos</Link></li>
              <li><Link href="/que-hacemos" className="hover:text-[#FFC107] transition-colors">Qué Hacemos</Link></li>
              <li><Link href="/programas" className="hover:text-[#FFC107] transition-colors">Programas</Link></li>
              <li><Link href="/cursos" className="hover:text-[#FFC107] transition-colors">Cursos</Link></li>
              <li><Link href="/contacto" className="hover:text-[#FFC107] transition-colors">Contacto</Link></li>
              <li><Link href="/transparencia" className="hover:text-[#FFC107] transition-colors">Transparencia</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Información Legal</h4>
            <ul className="space-y-2 text-[#E8F0FE]/60 text-xs leading-relaxed">
              <li>Entidad Sin Ánimo de Lucro (ESAL)</li>
              <li>Régimen Tributario Especial</li>
              <li>Constituida: 11 de junio de 2010</li>
              <li>Inscripción CCB: S0037201</li>
              <li>Vigilada por la Alcaldía Mayor de Bogotá</li>
              <li>Bogotá D.C., Colombia</li>
            </ul>

            <h4 className="text-white font-bold mb-3 mt-6 text-sm">Síguenos</h4>
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
                  className="group w-9 h-9 rounded-full border border-[#FFC107]/50 flex items-center justify-center text-[#FFC107] hover:border-[#FFC107] hover:scale-110 hover:shadow-[0_0_12px_rgba(255,193,7,0.4)] transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center space-y-2">
          <p className="text-[#E8F0FE]/40 text-xs">
            © {new Date().getFullYear()} Fundación Toma Nuestra Mano Para Tu Desarrollo Social Integral — Todos los derechos reservados · Bogotá, Colombia
          </p>
          <p className="text-[#E8F0FE]/40 text-xs">
            Hecho con <span className="text-[#FFC107]">♥</span> por <span className="text-[#FFC107] font-semibold">JuanCode</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
