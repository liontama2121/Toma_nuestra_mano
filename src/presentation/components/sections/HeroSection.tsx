export function HeroSection() {
  return (
    <section id="inicio" className="relative h-[40vh] min-h-[280px] sm:h-[55vh] md:h-screen">
      {/* Video + overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-contain md:object-cover object-center"
        >
          <source src="/backvideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs z-10">
        <span>Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
