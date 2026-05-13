import { StatsChips } from './StatsChips';

interface WelcomeBlockProps {
  displayName: string;
}

export function WelcomeBlock({ displayName }: WelcomeBlockProps) {
  return (
    <div className="mb-10">
      <h1 className="text-3xl sm:text-4xl font-bold mb-2">
        Hola, <span style={{ color: 'var(--tnm-accent)' }}>{displayName}</span> 🚀
      </h1>
      <p className="mb-6" style={{ color: 'var(--tnm-text-muted)' }}>
        Tu próxima misión te está esperando
      </p>
      <StatsChips />
    </div>
  );
}
