'use client';

import { createContext } from 'react';
import { AuthUser } from '@/domain/entities/AuthUser';

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated' | 'error';

export interface AuthContextValue {
  user: AuthUser | null;
  status: AuthStatus;
  roles: string[];
  isAuthenticated: boolean;
  error: string | null;
  login: (email?: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (role: string) => boolean;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  status: 'loading',
  roles: [],
  isAuthenticated: false,
  error: null,
  login: async () => {},
  logout: async () => {},
  hasRole: () => false,
});
