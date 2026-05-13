import { Navbar } from '@/presentation/components/layout/Navbar';
import { WhatsAppButton } from '@/presentation/components/ui/WhatsAppButton';
import { Footer } from '@/presentation/components/layout/Footer';
import { HeroSection } from '@/presentation/components/sections/HeroSection';
import { PillarsSection } from '@/presentation/components/sections/PillarsSection';
import { MisionEspacialSection } from '@/presentation/components/sections/MisionEspacialSection';
import { ProgramsSection } from '@/presentation/components/sections/ProgramsSection';
import { ImpactSection } from '@/presentation/components/sections/ImpactSection';
import { VideoCarouselSection } from '@/presentation/components/sections/VideoCarouselSection';
import { DonationSection } from '@/presentation/components/sections/DonationSection';
import { PlataformaCTA } from '@/presentation/components/sections/PlataformaCTA';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PillarsSection />
        <MisionEspacialSection />
        <ProgramsSection />
        <ImpactSection />
        <VideoCarouselSection />
        <DonationSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <PlataformaCTA />
    </>
  );
}
