'use client';

import { ImpactStat } from '@/domain/entities/ImpactStat';
import { useCounterUp } from '../../hooks/useCounterUp';

function StatCounter({ stat }: { stat: ImpactStat }) {
  const ref = useCounterUp(stat.value, 2000, stat.suffix);

  return (
    <div className="text-center group">
      <div
        className="relative mx-auto mb-4 w-24 h-24 rounded-full flex items-center justify-center"
        style={{
          background: `radial-gradient(circle, ${stat.color}20 0%, transparent 70%)`,
          border: `1px solid ${stat.color}30`,
          boxShadow: `0 0 30px ${stat.color}15`,
        }}
      >
        <span
          ref={ref}
          className="font-black text-2xl"
          style={{ color: stat.color }}
        >
          0
        </span>
      </div>
      <p className="text-[#E8F0FE]/70 text-sm font-medium">{stat.label}</p>
    </div>
  );
}

export function ImpactCounterClient({ stats }: { stats: ImpactStat[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat) => (
        <StatCounter key={stat.id} stat={stat} />
      ))}
    </div>
  );
}
