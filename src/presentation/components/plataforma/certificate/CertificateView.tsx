'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Certificate } from '@/domain/entities/Certificate';
import { Confetti } from './Confetti';

interface CertificateViewProps {
  cert: Certificate;
}

export function CertificateView({ cert }: CertificateViewProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const [{ pdf }, { CertificatePDF }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('./CertificatePDF'),
      ]);
      const blob = await pdf(<CertificatePDF cert={cert} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificado-${cert.signature}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    let cancelled = false;

    (async () => {
      const { animate } = await import('animejs');
      if (cancelled) return;
      animate(card, { scale: [0.85, 1], opacity: [0, 1], duration: 800, ease: 'outBack' });
    })();

    return () => { cancelled = true; };
  }, []);

  const date = new Date(cert.issuedAt).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center py-16 px-4"
      style={{ background: '#FDF7F6' }}>
      <Confetti />

      <div ref={cardRef} id="certificate-card"
        className="relative w-full max-w-2xl rounded-3xl p-10 shadow-2xl"
        style={{
          background: '#fff',
          border: '6px double #8B5CF6',
          outline: '2px solid #F59E0B',
          outlineOffset: '4px',
          opacity: 0,
        }}>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🤝</div>
          <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#8B5CF6' }}>
            Fundación Toma Nuestra Mano
          </p>
          <h1 className="text-3xl font-bold mb-1" style={{ color: '#0A2472' }}>
            Certificado de Finalización
          </h1>
          <div className="w-24 h-1 mx-auto rounded" style={{ background: '#F59E0B' }} />
        </div>

        <div className="text-center mb-8">
          <p className="text-sm mb-2" style={{ color: '#666' }}>Otorgado a</p>
          <p className="text-4xl font-bold italic mb-4" style={{ color: '#0A2472' }}>
            {cert.studentName}
          </p>
          <p className="text-base" style={{ color: '#333' }}>
            por completar exitosamente el curso
          </p>
          <p className="text-xl font-bold mt-1" style={{ color: '#8B5CF6' }}>{cert.courseTitle}</p>
          <p className="text-sm mt-1" style={{ color: '#666' }}>
            del programa <strong>{cert.programName}</strong>
          </p>
        </div>

        <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: '#e5e7eb' }}>
          <div>
            <p className="text-xs" style={{ color: '#999' }}>{date}</p>
            <p className="text-sm font-bold italic" style={{ color: '#0A2472' }}>
              El equipo Toma Nuestra Mano
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs" style={{ color: '#999' }}>ID de verificación</p>
            <p className="font-mono text-sm font-bold" style={{ color: '#8B5CF6' }}>#{cert.signature}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8 z-10">
        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="px-6 py-3 rounded-full font-bold text-sm transition-all duration-200 hover:opacity-90 cursor-pointer disabled:opacity-60"
          style={{ background: '#F59E0B', color: '#000' }}>
          {downloading ? 'Generando PDF...' : 'Descargar PDF'}
        </button>
        <Link href="/plataforma"
          className="px-6 py-3 rounded-full font-bold text-sm border-2 transition-all duration-200 hover:bg-white/10 cursor-pointer"
          style={{ borderColor: '#0A2472', color: '#0A2472', background: 'transparent' }}>
          Volver al panel
        </Link>
        <button disabled
          className="px-6 py-3 rounded-full font-bold text-sm opacity-40 cursor-not-allowed"
          style={{ border: '2px solid #999', color: '#999' }}
          title="Próximamente">
          Compartir
        </button>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          #certificate-card, #certificate-card * { visibility: visible; }
          #certificate-card { position: fixed; top: 0; left: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
}
