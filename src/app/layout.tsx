import type { Metadata } from 'next';
import { Orbitron, Nunito } from 'next/font/google';
import './globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '700', '800', '900'],
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Fundación Toma Nuestra Mano — Hagámoslo Hoy',
  description:
    'Fundación colombiana sin ánimo de lucro que transforma vidas a través de tecnología, innovación, educación y bienestar comunitario. Bogotá, Colombia desde 2010.',
  keywords: ['fundación', 'Colombia', 'tecnología', 'educación', 'niños', 'innovación', 'Bogotá'],
  openGraph: {
    title: 'Fundación Toma Nuestra Mano',
    description: 'Hagámoslo Hoy — Tecnología e innovación para transformar vidas en Colombia',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${orbitron.variable} ${nunito.variable}`}>
      <body className="antialiased font-[family-name:var(--font-nunito)] bg-[#050D2E] text-[#E8F0FE]">
        {children}
      </body>
    </html>
  );
}
