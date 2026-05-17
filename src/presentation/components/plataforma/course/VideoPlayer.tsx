'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  sectionId: string;
  onComplete: () => void;
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export function VideoPlayer({ videoUrl, sectionId, onComplete }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [watched, setWatched] = useState(false);
  const youtubeId = getYouTubeId(videoUrl);

  useEffect(() => {
    const already = localStorage.getItem(`tnm:video-watched:${sectionId}`) === 'true';
    if (already) {
      setWatched(true);
      onComplete();
    }
  }, [sectionId, onComplete]);

  const markComplete = () => {
    localStorage.setItem(`tnm:video-watched:${sectionId}`, 'true');
    setWatched(true);
    onComplete();
  };

  if (youtubeId) {
    return (
      <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
          title="Video de la lección"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video border-0"
          style={{ background: '#000' }}
        />
        {!watched && (
          <div className="px-4 py-3 flex items-center justify-between" style={{ background: 'var(--tnm-bg)' }}>
            <p className="text-xs" style={{ color: 'var(--tnm-text-muted)' }}>
              Cuando termines el video, márcalo como completado
            </p>
            <button
              onClick={markComplete}
              className="text-xs px-4 py-1.5 rounded-lg border border-[#FFC107]/50 text-[#FFC107] hover:bg-[#FFC107]/10 transition-colors duration-200 cursor-pointer"
            >
              ✓ Completado
            </button>
          </div>
        )}
        {watched && (
          <div className="px-4 py-2 text-center text-xs text-green-400" style={{ background: 'var(--tnm-bg)' }}>
            ✓ Sección completada
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        preload="metadata"
        playsInline
        onEnded={markComplete}
        className="w-full aspect-video"
        style={{ background: '#000' }}
      />
      {process.env.NODE_ENV === 'development' && !watched && (
        <div className="px-4 py-2" style={{ background: 'var(--tnm-bg)' }}>
          <button onClick={markComplete}
            className="text-xs px-3 py-1 rounded border border-white/20 transition-colors duration-200 hover:border-white/40 cursor-pointer"
            style={{ color: 'var(--tnm-text-muted)' }}>
            Marcar como visto (dev)
          </button>
        </div>
      )}
    </div>
  );
}
