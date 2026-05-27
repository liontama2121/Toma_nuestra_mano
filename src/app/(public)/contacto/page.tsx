import type { Metadata } from 'next';
import { ContactoClient } from '@/presentation/components/sections/ContactoClient';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contacta a Fundación Toma Nuestra Mano: Calle 100 No. 8A-55, Torre C, Of. 408, Bogotá D.C. Teléfonos +57 310 666 9875 / +57 300 291 3313.',
};

export default function ContactoPage() {
  return <ContactoClient />;
}
