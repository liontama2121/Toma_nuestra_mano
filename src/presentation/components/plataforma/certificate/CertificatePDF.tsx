'use client';

// ⚠️ @react-pdf/renderer NO es edge-compatible (usa Node fs/stream/Buffer).
// Solo importar desde client components con dynamic import (ver CertificateView.tsx).
// Importarlo server-side rompe el build de Cloudflare Pages (next-on-pages).
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Certificate } from '@/domain/entities/Certificate';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FDF7F6',
    padding: 60,
    fontFamily: 'Helvetica',
    position: 'relative',
  },
  outerBorder: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    border: '4px solid #8B5CF6',
  },
  innerBorder: {
    position: 'absolute',
    top: 28,
    left: 28,
    right: 28,
    bottom: 28,
    border: '2px solid #F59E0B',
  },
  content: {
    alignItems: 'center',
    textAlign: 'center',
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
    textAlign: 'center',
  },
  foundation: {
    fontSize: 9,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: '#8B5CF6',
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: '#0A2472',
    marginBottom: 8,
  },
  divider: {
    width: 80,
    height: 3,
    backgroundColor: '#F59E0B',
    marginBottom: 28,
    alignSelf: 'center',
  },
  awardedLabel: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 6,
  },
  studentName: {
    fontSize: 32,
    fontFamily: 'Helvetica-BoldOblique',
    color: '#0A2472',
    marginBottom: 14,
  },
  completionText: {
    fontSize: 13,
    color: '#333333',
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: '#8B5CF6',
    marginBottom: 4,
  },
  programText: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 40,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: '1px solid #E5E7EB',
    paddingTop: 16,
  },
  footerLeft: {
    fontSize: 9,
    color: '#999999',
  },
  footerRight: {
    fontSize: 9,
    color: '#999999',
    textAlign: 'right',
  },
  signature: {
    fontSize: 12,
    fontFamily: 'Helvetica-BoldOblique',
    color: '#0A2472',
    marginTop: 2,
  },
  hash: {
    fontFamily: 'Helvetica',
    color: '#8B5CF6',
    marginTop: 2,
    fontSize: 10,
  },
});

interface CertificatePDFProps {
  cert: Certificate;
}

export function CertificatePDF({ cert }: CertificatePDFProps) {
  const date = new Date(cert.issuedAt).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Document title={`Certificado — ${cert.studentName}`} author="Fundación Toma Nuestra Mano">
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.outerBorder} />
        <View style={styles.innerBorder} />

        <View style={styles.content}>
          <Text style={styles.emoji}>🤝</Text>
          <Text style={styles.foundation}>Fundación Toma Nuestra Mano</Text>
          <Text style={styles.title}>Certificado de Aprobación</Text>
          <View style={styles.divider} />

          <Text style={styles.awardedLabel}>Otorgado a</Text>
          <Text style={styles.studentName}>{cert.studentName}</Text>

          <Text style={styles.completionText}>
            por completar exitosamente el curso
          </Text>
          <Text style={styles.courseTitle}>{cert.courseTitle}</Text>
          <Text style={styles.programText}>
            del programa &quot;{cert.programName}&quot;
          </Text>

          <View style={styles.footer}>
            <View style={styles.footerLeft}>
              <Text>{date}</Text>
              <Text style={styles.signature}>El equipo Toma Nuestra Mano</Text>
            </View>
            <View style={styles.footerRight}>
              <Text>ID de verificación</Text>
              <Text style={styles.hash}>#{cert.signature}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
