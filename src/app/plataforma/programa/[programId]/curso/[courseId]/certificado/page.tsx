'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CertificateView } from '@/presentation/components/plataforma/certificate/CertificateView';
import { getClientUseCases } from '@/lib/diClient';
import { useStudent } from '@/presentation/hooks/useStudent';
import { Certificate } from '@/domain/entities/Certificate';
import Link from 'next/link';

export default function CertificadoPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const student = useStudent();
  const [cert, setCert] = useState<Certificate | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getClientUseCases().certRepo.getByCourseAndStudent(courseId, student.id).then((c) => {
      if (c) setCert(c);
      else setNotFound(true);
    });
  }, [courseId, student.id]);

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4"
        style={{ background: '#FDF7F6' }}>
        <div className="text-5xl">🔒</div>
        <h2 className="text-xl font-bold" style={{ color: '#0A2472' }}>Certificado no disponible</h2>
        <p style={{ color: '#666' }}>Completa todas las secciones del curso para obtenerlo.</p>
        <Link href="/plataforma"
          className="px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:opacity-90 cursor-pointer"
          style={{ background: '#F59E0B', color: '#000' }}>
          Volver al panel
        </Link>
      </div>
    );
  }

  if (!cert) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FDF7F6' }}>
        <div className="text-4xl animate-pulse">🏆</div>
      </div>
    );
  }

  return <CertificateView cert={cert} />;
}
