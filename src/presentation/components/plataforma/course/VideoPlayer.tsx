'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  sectionId: string;
  onComplete: () => void;
}

export function VideoPlayer({ videoUrl, sectionId, onComplete }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [watched, setWatched] = useState(false);

  useEffect(() => {
    const already = localStorage.getItem(`tnm:video-watched:${sectionId}`) === 'true';
    if (already) {
      setWatched(true);
      onComplete();
    }
  }, [sectionId, onComplete]);

  const handleEnded = () => {
    localStorage.setItem(`tnm:video-watched:${sectionId}`, 'true');
    setWatched(true);
    onComplete();
  };

  const handleDevMark = () => {
    localStorage.setItem(`tnm:video-watched:${sectionId}`, 'true');
    setWatched(true);
    onComplete();
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        preload="metadata"
        playsInline
        onEnded={handleEnded}
        className="w-full aspect-video"
        style={{ background: '#000' }}
      />
      {process.env.NODE_ENV === 'development' && !watched && (
        <div className="px-4 py-2" style={{ background: 'var(--tnm-bg)' }}>
          <button onClick={handleDevMark}
            className="text-xs px-3 py-1 rounded border border-white/20 transition-colors duration-200 hover:border-white/40 cursor-pointer"
            style={{ color: 'var(--tnm-text-muted)' }}>
            Marcar como visto (dev)
          </button>
        </div>
      )}
    </div>
  );
}
