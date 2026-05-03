import { Navbar } from '@/presentation/components/layout/Navbar';
import { Footer } from '@/presentation/components/layout/Footer';
import { HeroSection } from '@/presentation/components/sections/HeroSection';
import { PillarsSection } from '@/presentation/components/sections/PillarsSection';
import { MisionEspacialSection } from '@/presentation/components/sections/MisionEspacialSection';
import { ProgramsSection } from '@/presentation/components/sections/ProgramsSection';
import { ImpactSection } from '@/presentation/components/sections/ImpactSection';
import { DonationSection } from '@/presentation/components/sections/DonationSection';

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
        <DonationSection />
      </main>
      <Footer />
    </>
  );
}
