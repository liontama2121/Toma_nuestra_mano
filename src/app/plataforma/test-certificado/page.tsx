'use client';

import { CertificateView } from '@/presentation/components/plataforma/certificate/CertificateView';
import { Certificate } from '@/domain/entities/Certificate';

const TEST_CERT: Certificate = {
  id: 'test-cert-001',
  studentName: 'Sofía Martínez',
  courseTitle: 'Misión Espacial Colombia',
  programName: 'Misión Espacial Colombia',
  issuedAt: new Date().toISOString(),
  signature: 'A1B2C3D4',
};

export default function TestCertificadoPage() {
  return (
    <div>
      <div className="fixed top-20 left-4 z-50">
        <span className="px-3 py-1 rounded-full text-xs font-bold"
          style={{ background: 'rgba(239,68,68,0.2)', color: '#EF4444', border: '1px solid #EF4444' }}>
          MODO PRUEBA
        </span>
      </div>
      <CertificateView cert={TEST_CERT} />
    </div>
  );
}
