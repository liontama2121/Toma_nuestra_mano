import { getVideosUseCase } from '@/lib/di';
import { VideoCarouselClient } from './VideoCarouselClient';

export async function VideoCarouselSection() {
  const videos = await getVideosUseCase.execute();

  return (
    <section id="videos" className="relative py-24">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(10,36,114,0.15) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#FFC107] text-sm font-bold tracking-widest uppercase mb-3">Nuestro Canal</p>
          <h2 className="font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Videos que
            <span className="bg-gradient-to-r from-[#FFC107] to-[#F57C00] bg-clip-text text-transparent"> inspiran</span>
          </h2>
          <p className="text-[#E8F0FE]/60 max-w-xl mx-auto">
            Conoce de primera mano el impacto de nuestros programas a través de los ojos de quienes los viven.
          </p>
        </div>

        <VideoCarouselClient videos={videos} />

        <div className="text-center mt-10">
          <a
            href="https://www.youtube.com/@tomanuestramano"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#FFC107] hover:text-[#F57C00] transition-colors text-sm font-medium"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
            </svg>
            Ver canal completo en YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
