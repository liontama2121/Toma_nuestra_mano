import { PlataformaHeader } from './PlataformaHeader';

export function PlataformaShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--tnm-bg-deep)', color: 'var(--tnm-text-primary)' }}>
      <PlataformaHeader />
      <main className="pt-16">{children}</main>
    </div>
  );
}
