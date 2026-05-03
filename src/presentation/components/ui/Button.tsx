'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-bold rounded-full transition-all duration-300 cursor-pointer';

  const variants = {
    primary: 'bg-gradient-to-r from-[#F57C00] to-[#FFC107] text-[#050D2E] hover:shadow-[0_0_30px_rgba(255,193,7,0.5)] hover:scale-105',
    outline: 'border-2 border-[#FFC107] text-[#FFC107] hover:bg-[#FFC107] hover:text-[#050D2E] hover:scale-105',
    ghost: 'text-[#E8F0FE] hover:text-[#FFC107] hover:scale-105',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}
