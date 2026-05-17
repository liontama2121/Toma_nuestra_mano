'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { VideoPlayer } from '@/presentation/components/plataforma/course/VideoPlayer';
import { QuizBlock } from '@/presentation/components/plataforma/course/QuizBlock';
import { CourseProgressBar } from '@/presentation/components/plataforma/course/CourseProgressBar';
import { SectionNavigation } from '@/presentation/components/plataforma/course/SectionNavigation';
import { getCourseDetailUseCase } from '@/lib/di';
import { quizzesBySectionId } from '@/infrastructure/data/quizData';
import { Course } from '@/domain/entities/Course';
import { Section } from '@/domain/entities/Section';
import Link from 'next/link';

export default function SeccionPage() {
  const { programId, courseId, order: orderStr } = useParams<{
    programId: string;
    courseId: string;
    order: string;
  }>();

  const order = parseInt(orderStr, 10);
  const [course, setCourse] = useState<Course | null>(null);
  const [section, setSection] = useState<Section | null>(null);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);

  useEffect(() => {
    getCourseDetailUseCase.execute(courseId).then((c) => {
      if (!c) return;
      setCourse(c);
      setSection(c.sections.find((s) => s.order === order) ?? null);
    });
  }, [courseId, order]);

  useEffect(() => {
    if (!section) return;
    const already = localStorage.getItem(`tnm:video-watched:${section.id}`) === 'true';
    if (already) setVideoCompleted(true);
    const quizAlready = localStorage.getItem(`tnm:quiz-passed:${section.id}`) === 'true';
    const hasQuiz = !!quizzesBySectionId[section.id];
    if (quizAlready || !hasQuiz) setQuizPassed(true);
  }, [section]);

  const handleComplete = useCallback(() => setVideoCompleted(true), []);
  const handleQuizPass = useCallback(() => setQuizPassed(true), []);

  if (!course || !section) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center" style={{ color: 'var(--tnm-text-muted)' }}>
          <div className="text-4xl mb-4">🔭</div>
          <p>Cargando sección...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <CourseProgressBar courseId={courseId} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-1">

        <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: 'var(--tnm-text-muted)' }}>
          <Link href="/plataforma" className="hover:text-[#F59E0B] transition-colors duration-200 cursor-pointer">Panel</Link>
          <span>/</span>
          <Link href={`/plataforma/programa/${programId}`} className="hover:text-[#F59E0B] transition-colors duration-200 cursor-pointer">
            Programa
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--tnm-text-primary)' }}>Sección {order}</span>
        </nav>

        <div id="section-content">
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--tnm-accent)' }}>
            Sección {order} de {course.sections.length}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">{section.title}</h1>

          <VideoPlayer
            videoUrl={section.videoUrl}
            sectionId={section.id}
            onComplete={handleComplete}
          />

          <p className="mt-6 text-sm leading-relaxed" style={{ color: 'var(--tnm-text-muted)' }}>
            {section.description}
          </p>

          {!videoCompleted && (
            <p className="mt-4 text-xs" style={{ color: 'var(--tnm-accent)' }}>
              ⏳ Mira el video completo para continuar
            </p>
          )}

          {videoCompleted && quizzesBySectionId[section.id] && (
            <QuizBlock
              quiz={quizzesBySectionId[section.id]}
              onPass={handleQuizPass}
            />
          )}
        </div>

        <div className="mt-8">
          <SectionNavigation
            programId={programId}
            courseId={courseId}
            sectionId={section.id}
            order={order}
            totalSections={course.sections.length}
            videoCompleted={videoCompleted && quizPassed}
          />
        </div>
      </div>
    </>
  );
}
