import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-[#020918] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo_png.png" alt="Logo" width={48} height={48} className="rounded-full" />
              <div>
                <p className="text-white font-bold font-orbitron text-sm">Toma Nuestra Mano</p>
                <p className="text-[#FFC107] text-xs">Hagámoslo Hoy</p>
              </div>
            </div>
            <p className="text-[#E8F0FE]/60 text-sm leading-relaxed">
              Fundación colombiana sin ánimo de lucro, comprometida con el desarrollo social integral de niños y jóvenes.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 font-orbitron text-sm">Información Legal</h4>
            <ul className="space-y-2 text-[#E8F0FE]/60 text-xs leading-relaxed">
              <li>FUNDACION TOMA NUESTRA MANO PARA TU DESARROLLO SOCIAL INTEGRAL</li>
              <li>Constituida: Acta No. 1 — 2 de junio de 2010</li>
              <li>Cámara de Comercio, Libro I, No. 00174393</li>
              <li>Vigilada por la Alcaldía Mayor de Bogotá</li>
              <li>Bogotá D.C., Colombia</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 font-orbitron text-sm">Síguenos</h4>
            <a
              href="https://www.facebook.com/fundacion.tomanuestramano/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#E8F0FE]/60 hover:text-[#FFC107] transition-colors text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              fundacion.tomanuestramano
            </a>
            <div className="mt-6">
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
