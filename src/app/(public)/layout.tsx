import { Navbar } from '@/presentation/components/layout/Navbar';
import { Footer } from '@/presentation/components/layout/Footer';
import { WhatsAppButton } from '@/presentation/components/ui/WhatsAppButton';
import { PlataformaCTA } from '@/presentation/components/sections/PlataformaCTA';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppButton />
      <PlataformaCTA />
    </>
  );
}
