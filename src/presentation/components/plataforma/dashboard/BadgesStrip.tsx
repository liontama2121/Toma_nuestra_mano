const badges = [
  { emoji: '🚀', label: 'Primer despegue', unlocked: true },
  { emoji: '⭐', label: 'Explorador', unlocked: true },
  { emoji: '🏆', label: 'Misión cumplida', unlocked: false },
];

export function BadgesStrip() {
  return (
    <div className="rounded-2xl p-6 border border-white/10" style={{ background: 'var(--tnm-bg)' }}>
      <p className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: 'var(--tnm-accent)' }}>
        Insignias recientes
      </p>
      <div className="flex gap-4">
        {badges.map((b) => (
          <div key={b.label} className="flex flex-col items-center gap-2">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 transition-all duration-200 ${
              b.unlocked
                ? 'border-[#F59E0B] shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                : 'border-white/10 opacity-40 grayscale'
            }`}
              style={{ background: b.unlocked ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)' }}>
              {b.emoji}
            </div>
            <span className="text-xs text-center leading-tight" style={{ color: 'var(--tnm-text-muted)' }}>
              {b.unlocked ? b.label : '???'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
