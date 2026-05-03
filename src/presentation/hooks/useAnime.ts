'use client';

import { useRef, useCallback } from 'react';
import type { TargetsParam } from 'animejs';

type AnimeV4Params = Record<string, unknown>;

export function useAnime() {
  const instanceRef = useRef<{ pause: () => void; restart?: () => void } | null>(null);

  const play = useCallback(async (targets: TargetsParam, params: AnimeV4Params) => {
    const { animate } = await import('animejs');
    instanceRef.current = animate(targets, params as Parameters<typeof animate>[1]);
    return instanceRef.current;
  }, []);

  const pause = useCallback(() => {
    instanceRef.current?.pause();
  }, []);

  const restart = useCallback(() => {
    instanceRef.current?.restart?.();
  }, []);

  return { play, pause, restart };
}
