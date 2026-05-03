import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function Card({ children, className = '', glowColor = '#0A2472' }: CardProps) {
  return (
    <div
      className={`relative rounded-2xl p-6 backdrop-blur-md bg-white/5 border border-white/10 transition-all duration-500 hover:border-white/30 group ${className}`}
      style={{ '--glow': glowColor } as React.CSSProperties}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `0 0 40px ${glowColor}40` }} />
      {children}
    </div>
  );
}
