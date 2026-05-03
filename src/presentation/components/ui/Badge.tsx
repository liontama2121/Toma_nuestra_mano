interface BadgeProps {
  children: React.ReactNode;
  color?: string;
}

export function Badge({ children, color = '#FFC107' }: BadgeProps) {
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}
    >
      {children}
    </span>
  );
}
