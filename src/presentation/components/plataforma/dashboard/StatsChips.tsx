'use client';

import { useCounterUp } from '@/presentation/hooks/useCounterUp';

function StatChip({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const ref = useCounterUp(value, 1800, suffix);
  return (
    <div className="flex flex-col items-center px-6 py-3 rounded-2xl border border-white/10"
      style={{ background: 'rgba(255,255,255,0.04)' }}>
      <span ref={ref} className="text-2xl font-bold" style={{ color: 'var(--tnm-accent)' }}>0</span>
      <span className="text-xs mt-1" style={{ color: 'var(--tnm-text-muted)' }}>{label}</span>
    </div>
  );
}

export function StatsChips() {
  return (
    <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
      <StatChip value={12} label="Retos completados" />
      <StatChip value={8} label="Horas de aprendizaje" suffix="h" />
      <StatChip value={3} label="Insignias ganadas" />
    </div>
  );
}
