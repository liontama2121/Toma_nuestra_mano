import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fundación Toma Nuestra Mano — Hagámoslo Hoy',
  description:
    'Fundación colombiana que transforma vidas a través de tecnología, innovación y educación.',
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