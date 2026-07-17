// React context reproducing the current-user/auth behavior of
// src/js/services/user.service.js (attemptAuth, update, logout, verifyAuth).
import { createContext } from 'react';
import type {
  LoginCredentials,
  RegisterCredentials,
  UpdateUserFields,
  User,
} from '@/api';

export interface AuthContextValue {
  /** The current authenticated user, or null when logged out. */
  user: User | null;
  /** True until the initial verifyAuth() resolves. */
  isLoading: boolean;
  /** Convenience flag derived from `user`. */
  isAuthenticated: boolean;
  /** Log in or register; persists the JWT and sets the current user. */
  authenticate: (
    type: 'login' | 'register',
    credentials: LoginCredentials | RegisterCredentials,
  ) => Promise<User>;
  /** Update the current user (settings page). */
  updateUser: (fields: UpdateUserFields) => Promise<User>;
  /** Clear the token and current user. */
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
