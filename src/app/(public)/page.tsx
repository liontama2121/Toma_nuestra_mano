import { HeroSection } from '@/presentation/components/sections/HeroSection';
import { PillarsSection } from '@/presentation/components/sections/PillarsSection';
import { MisionEspacialSection } from '@/presentation/components/sections/MisionEspacialSection';
import { ProgramsSection } from '@/presentation/components/sections/ProgramsSection';
import { ImpactSection } from '@/presentation/components/sections/ImpactSection';
import { VideoCarouselSection } from '@/presentation/components/sections/VideoCarouselSection';
import { DonationSection } from '@/presentation/components/sections/DonationSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <PillarsSection />
      <MisionEspacialSection />
      <ProgramsSection />
      <ImpactSection />
      <VideoCarouselSection />
      <DonationSection />
    </>
  );
}
