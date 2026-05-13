'use client';

import { useEffect, useState, useCallback } from 'react';
import { Progress } from '@/domain/entities/Progress';
import { MOCK_STUDENT } from '@/lib/mockStudent';

export function useCourseProgress(courseId: string) {
  const [progress, setProgress] = useState<Progress | null>(null);

  const load = useCallback(() => {
    const key = `tnm:progress:${MOCK_STUDENT.id}:${courseId}`;
    const raw = localStorage.getItem(key);
    if (!raw) return;
    try {
      setProgress(JSON.parse(raw) as Progress);
    } catch { /* ignore */ }
  }, [courseId]);

  useEffect(() => {
    load();

    const onStorage = (e: StorageEvent) => {
      if (e.key === `tnm:progress:${MOCK_STUDENT.id}:${courseId}`) load();
    };
    const onCustom = () => load();

    window.addEventListener('storage', onStorage);
    window.addEventListener('tnm:progress-updated', onCustom);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('tnm:progress-updated', onCustom);
    };
  }, [courseId, load]);

  return progress;
}
