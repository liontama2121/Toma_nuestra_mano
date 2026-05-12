'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video } from '@/domain/entities/Video';

interface Props {
  videos: Video[];
}

export function VideoCarouselClient({ videos }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [autoplay, setAutoplay] = useState(true);
  const [userPaused, setUserPaused] = useState(false);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pauseTemporarily = () => {
    setUserPaused(true);
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setUserPaused(false), 6000);
  };

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((c) => (c + dir + videos.length) % videos.length);
      pauseTemporarily();
    },
    [videos.length]
  );

  const goTo = useCallback(
    (i: number) => {
      setDirection(i > current ? 1 : -1);
      setCurrent(i);
      pauseTemporarily();
    },
    [current]
  );

  useEffect(() => {
    if (!autoplay || userPaused) return;
    const t = setTimeout(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % videos.length);
    }, 6000);
    return () => clearTimeout(t);
  }, [autoplay, userPaused, current, videos.length]);

  useEffect(() => () => { if (pauseTimer.current) clearTimeout(pauseTimer.current); }, []);

  const prevIdx = (current - 1 + videos.length) % videos.length;
  const nextIdx = (current + 1) % videos.length;

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '60%' : '-60%', opacity: 0, scale: 0.92 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-60%' : '60%', opacity: 0, scale: 0.92 }),
  };

  return (
    <div className="w-full" onMouseEnter={() => setUserPaused(true)} onMouseLeave={() => setUserPaused(false)}>

      {/* Carousel stage */}
      <div className="flex items-center gap-3 lg:gap-5">

        {/* Prev peek */}
        <button
          onClick={() => go(-1)}
          aria-label="Video anterior"
          className="hidden lg:flex flex-shrink-0 w-[22%] rounded-xl overflow-hidden relative cursor-pointer group"
          style={{ aspectRatio: '16/9' }}
        >
          <img
            src={`https://img.youtube.com/vi/${videos[prevIdx].id}/hqdefault.jpg`}
            alt={videos[prevIdx].title}
            className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-300 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050D2E] via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/60 group-hover:text-white text-5xl transition-colors select-none">‹</span>
          </div>
          <p className="absolute bottom-3 left-0 right-0 text-center text-white/40 group-hover:text-white/70 text-xs px-3 truncate transition-colors">
            {videos[prevIdx].title}
          </p>
        </button>

        {/* Main video */}
        <div className="flex-1 relative rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(10,36,114,0.5)]" style={{ aspectRatio: '16/9' }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0"
            >
              <iframe
                src={`https://www.youtube.com/embed/${videos[current].id}?rel=0&modestbranding=1&color=white`}
                title={videos[current].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </motion.div>
          </AnimatePresence>

          {/* Mobile arrows */}
          <button
            onClick={() => go(-1)}
            aria-label="Anterior"
            className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center text-lg transition-colors z-10"
          >
            ‹
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Siguiente"
            className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center text-lg transition-colors z-10"
          >
            ›
          </button>
        </div>

        {/* Next peek */}
        <button
          onClick={() => go(1)}
          aria-label="Video siguiente"
          className="hidden lg:flex flex-shrink-0 w-[22%] rounded-xl overflow-hidden relative cursor-pointer group"
          style={{ aspectRatio: '16/9' }}
        >
          <img
            src={`https://img.youtube.com/vi/${videos[nextIdx].id}/hqdefault.jpg`}
            alt={videos[nextIdx].title}
            className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-300 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#050D2E] via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/60 group-hover:text-white text-5xl transition-colors select-none">›</span>
          </div>
          <p className="absolute bottom-3 left-0 right-0 text-center text-white/40 group-hover:text-white/70 text-xs px-3 truncate transition-colors">
            {videos[nextIdx].title}
          </p>
        </button>
      </div>

      {/* Title */}
      <div className="text-center mt-5 min-h-[1.75rem]">
        <AnimatePresence mode="wait">
          <motion.p
            key={current}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="text-white font-bold text-base lg:text-lg"
          >
            {videos[current].title}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Dots + autoplay */}
      <div className="flex items-center justify-center gap-4 mt-5">
        <div className="flex items-center gap-2">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir al video ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-7 h-2.5 bg-[#FFC107]'
                  : 'w-2.5 h-2.5 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => { setAutoplay((a) => !a); setUserPaused(false); }}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
            autoplay
              ? 'border-[#FFC107]/60 text-[#FFC107] bg-[#FFC107]/10'
              : 'border-white/20 text-white/40 hover:border-white/40 hover:text-white/60'
          }`}
        >
          {autoplay ? '⏸' : '▶'} Auto
        </button>
      </div>
    </div>
  );
}
