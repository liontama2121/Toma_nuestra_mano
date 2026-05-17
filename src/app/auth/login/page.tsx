import { AuthProvider } from '@/presentation/components/auth/AuthProvider';
import { LoginView } from '@/presentation/components/auth/LoginView';

export const metadata = {
  title: 'Iniciar sesión — Toma Nuestra Mano',
};

export default function LoginPage() {
  return (
    <AuthProvider requireAuth={false}>
      <LoginView />
    </AuthProvider>
  );
}
