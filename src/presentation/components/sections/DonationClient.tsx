'use client';

import { useState } from 'react';
import { DonationAmount } from '@/domain/entities/DonationAmount';
import { Button } from '../ui/Button';

export function DonationClient({ amounts }: { amounts: DonationAmount[] }) {
  const [selected, setSelected] = useState<string>('50k');
  const [customValue, setCustomValue] = useState('');

  const selectedAmount = amounts.find((a) => a.id === selected);

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
        {amounts.map((a) => {
          const isActive = selected === a.id;
          return (
            <button
              key={a.id}
              onClick={() => setSelected(a.id)}
              className="relative rounded-xl py-3 px-2 text-sm font-bold transition-all duration-200 border"
              style={{
                background: isActive ? 'linear-gradient(135deg, #F57C00, #FFC107)' : 'rgba(255,255,255,0.04)',
                borderColor: isActive ? '#FFC107' : 'rgba(255,255,255,0.1)',
                color: isActive ? '#050D2E' : '#E8F0FE',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {a.isPopular && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] bg-[#FFC107] text-[#050D2E] px-1.5 py-0.5 rounded-full font-black whitespace-nowrap">
                  POPULAR
                </span>
              )}
              {a.label}
            </button>
          );
        })}
      </div>

      {selectedAmount?.isCustom && (
        <div className="mb-8">
          <input
            type="number"
            placeholder="Ingresa el valor en COP"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            className="w-full max-w-xs mx-auto block rounded-xl px-4 py-3 text-center font-bold text-white outline-none"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,193,7,0.4)',
            }}
          />
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg">
          🚀 Donar {selectedAmount?.isCustom ? (customValue ? `$${Number(customValue).toLocaleString('es-CO')} COP` : 'Valor personalizado') : `${selectedAmount?.label} COP`}
        </Button>
        <Button size="lg" variant="outline" onClick={() => document.getElementById('programas')?.scrollIntoView({ behavior: 'smooth' })}>
          Ver en qué se usa
        </Button>
      </div>
    </div>
  );
}
