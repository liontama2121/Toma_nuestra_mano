import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fundación Toma Nuestra Mano — Hagámoslo Hoy',
  description:
    'Fundación colombiana sin ánimo de lucro que transforma vidas a través de tecnología, innovación, educación y bienestar comunitario. Bogotá, Colombia desde 2010.',
  keywords: ['fundación', 'Colombia', 'tecnología', 'educación', 'niños', 'innovación', 'Bogotá'],
  icons: { icon: '/logo.png' },
  openGraph: {
    title: 'Fundación Toma Nuestra Mano',
    description: 'Hagámoslo Hoy — Tecnología e innovación para transformar vidas en Colombia',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-[#050D2E] text-[#E8F0FE] antialiased">
        {children}
      </body>
    </html>
  );
}