import { AuthUser } from '@/domain/entities/AuthUser';

export interface MockUser extends AuthUser {
  email: string;
  password: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: 'student-001',
    displayName: 'Sofía Martínez',
    email: 'sofia@tomanuestramano.org',
    password: 'Sofia2025*',
    roles: ['estudiante'],
  },
  {
    id: 'teacher-001',
    displayName: 'Carlos Ramírez',
    email: 'carlos@tomanuestramano.org',
    password: 'Carlos2025*',
    roles: ['docente', 'estudiante'],
  },
  {
    id: 'admin-001',
    displayName: 'Laura Torres',
    email: 'laura@tomanuestramano.org',
    password: 'Laura2025*',
    roles: ['admin', 'docente', 'estudiante'],
  },
];

export function findMockUser(email: string, password: string): MockUser | null {
  return (
    MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    ) ?? null
  );
}
