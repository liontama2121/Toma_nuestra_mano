'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getClientUseCases } from '@/lib/diClient';
import { MOCK_STUDENT } from '@/lib/mockStudent';

interface SectionNavigationProps {
  programId: string;
  courseId: string;
  sectionId: string;
  order: number;
  totalSections: number;
  videoCompleted: boolean;
}

export function SectionNavigation({
  programId, courseId, sectionId, order, totalSections, videoCompleted,
}: SectionNavigationProps) {
  const router = useRouter();
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const pulseRef = useRef<{ pause?: () => void } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const btn = nextBtnRef.current;
    if (!btn || !videoCompleted) return;
    let cancelled = false;

    (async () => {
      const { animate } = await import('animejs');
      if (cancelled || !nextBtnRef.current) return;
      pulseRef.current = animate(nextBtnRef.current, {
        scale: [1, 1.04, 1],
        loop: true,
        ease: 'inOutSine',
        duration: 1500,
      });
    })();

    return () => {
      cancelled = true;
      pulseRef.current?.pause?.();
    };
  }, [videoCompleted]);

  const handleNext = async () => {
    if (!videoCompleted || loading) return;
    setLoading(true);

    try {
      const { animate } = await import('animejs');
      const content = document.getElementById('section-content');
      if (content) {
        await new Promise<void>((resolve) => {
          animate(content, { translateX: [0, -30], opacity: [1, 0], duration: 300, ease: 'inCubic', onComplete: () => resolve() });
        });
      }

      const uc = getClientUseCases();
      const updated = await uc.markSectionCompleted.execute(MOCK_STUDENT.id, courseId, sectionId);

      if (order === totalSections) {
        const course = await import('@/lib/di').then((m) => m.getCourseDetailUseCase.execute(courseId));
        const program = await import('@/lib/di').then((m) => m.getProgramsUseCase.execute()).then((ps) => ps.find((p) => p.id === programId));
        if (course && program) {
          await uc.issueCertificate.execute({
            studentId: MOCK_STUDENT.id,
            studentName: MOCK_STUDENT.displayName,
            courseId,
            courseTitle: course.title,
            programName: program.title,
          });
        }
        router.push(`/plataforma/programa/${programId}/curso/${courseId}/certificado`);
      } else {
        const nextOrder = order + 1;
        router.push(`/plataforma/programa/${programId}/curso/${courseId}/seccion/${nextOrder}`);
      }
      void updated;
    } finally {
      setLoading(false);
    }
  };

  const prevHref = order > 1
    ? `/plataforma/programa/${programId}/curso/${courseId}/seccion/${order - 1}`
    : null;

  return (
    <div className="flex items-center justify-between pt-6 border-t border-white/10">
      {prevHref ? (
        <a href={prevHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-white/20 transition-all duration-200 hover:border-white/40 cursor-pointer"
          style={{ color: 'var(--tnm-text-muted)' }}>
          ← Anterior
        </a>
      ) : (
        <span />
      )}

      <span className="text-xs" style={{ color: 'var(--tnm-text-muted)' }}>
        {order} / {totalSections}
      </span>

      <button
        ref={nextBtnRef}
        onClick={handleNext}
        disabled={!videoCompleted || loading}
        aria-label={order === totalSections ? 'Completar curso' : 'Siguiente sección'}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: videoCompleted ? 'var(--tnm-accent)' : 'rgba(255,255,255,0.08)',
          color: videoCompleted ? '#000' : 'var(--tnm-text-muted)',
        }}>
        {loading ? '...' : order === totalSections ? '¡Completar! 🚀' : 'Siguiente →'}
      </button>
    </div>
  );
}
