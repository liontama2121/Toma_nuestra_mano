'use client';

import { useContext } from 'react';
import { AuthContext, AuthContextValue } from '@/presentation/context/AuthContext';

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
