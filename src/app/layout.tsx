import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://tomanuestramano.org'),
  title: {
    default: 'Fundación Toma Nuestra Mano — Hagámoslo Hoy',
    template: '%s · Fundación Toma Nuestra Mano',
  },
  description:
    'Fundación Toma Nuestra Mano Para Tu Desarrollo Social Integral. Entidad sin ánimo de lucro colombiana (NIT 900.363.058-9) que promueve el desarrollo social integral en comunidades vulnerables desde 2010.',
  keywords: [
    'fundación',
    'Colombia',
    'Bogotá',
    'ESAL',
    'desarrollo social',
    'educación',
    'comunidad',
    'NIT 900363058',
    'Toma Nuestra Mano',
  ],
  icons: { icon: '/logo.png' },
  openGraph: {
    title: 'Fundación Toma Nuestra Mano',
    description: 'Hagámoslo Hoy — Desarrollo social integral para comunidades vulnerables en Colombia',
    type: 'website',
    locale: 'es_CO',
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
