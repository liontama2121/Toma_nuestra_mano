import { AuthProvider } from '@/presentation/components/auth/AuthProvider';
import { RegisterView } from '@/presentation/components/auth/RegisterView';

export const runtime = 'edge';

export const metadata = {
  title: 'Crear cuenta — Toma Nuestra Mano',
};

export default function RegisterPage() {
  return (
    <AuthProvider requireAuth={false}>
      <RegisterView />
    </AuthProvider>
  );
}
