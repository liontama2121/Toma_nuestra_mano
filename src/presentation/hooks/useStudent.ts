'use client';

import { MOCK_STUDENT } from '@/lib/mockStudent';
import { Student } from '@/domain/entities/Student';

export function useStudent(): Student {
  return MOCK_STUDENT;
}
