import Link from 'next/link';

export function PlataformaCTA() {
  return (
    <div className="fixed bottom-20 right-4 z-40 sm:bottom-6 sm:right-24">
      <Link href="/plataforma"
        className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer"
        style={{ background: 'rgba(10,14,39,0.95)', border: '1px solid rgba(245,158,11,0.5)', color: '#F59E0B', backdropFilter: 'blur(10px)' }}>
        🎓 ¿Ya eres estudiante? → Ingresa
      </Link>
    </div>
  );
}
