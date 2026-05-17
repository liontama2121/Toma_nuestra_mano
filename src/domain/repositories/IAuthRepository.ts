import { AuthUser } from '../entities/AuthUser';

export interface IAuthRepository {
  login(redirectUri?: string): Promise<void>;
  logout(redirectUri?: string): Promise<void>;
  getUser(): AuthUser | null;
  isAuthenticated(): boolean;
  refreshToken(): Promise<boolean>;
}
