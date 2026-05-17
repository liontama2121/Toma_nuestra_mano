'use client';

import { useAuth } from '@/presentation/hooks/useAuth';
import { MOCK_STUDENT } from '@/lib/mockStudent';
import { Student } from '@/domain/entities/Student';

export function useStudent(): Student {
  const { user } = useAuth();

  // Si hay usuario autenticado de Keycloak, lo usa; si no, cae al mock
  if (user) {
    return { id: user.id, displayName: user.displayName };
  }

  return MOCK_STUDENT;
}
