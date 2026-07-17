import { useCallback, useEffect, useMemo, useState } from 'react';
import { authApi, JWT } from '@/api';
import type {
  LoginCredentials,
  RegisterCredentials,
  UpdateUserFields,
  User,
} from '@/api';
import { AuthContext, type AuthContextValue } from './AuthContext';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Equivalent to User.verifyAuth() resolved by the abstract `app` state:
  // if a token exists, fetch the current user; on failure, drop the token.
  useEffect(() => {
    let cancelled = false;

    async function verifyAuth() {
      if (!JWT.get()) {
        if (!cancelled) setIsLoading(false);
        return;
      }
      try {
        const current = await authApi.getCurrentUser();
        if (!cancelled) setUser(current);
      } catch {
        JWT.destroy();
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void verifyAuth();
    return () => {
      cancelled = true;
    };
  }, []);

  const authenticate = useCallback(
    async (
      type: 'login' | 'register',
      credentials: LoginCredentials | RegisterCredentials,
    ) => {
      const current = await authApi.attemptAuth(type, credentials);
      setUser(current);
      return current;
    },
    [],
  );

  const updateUser = useCallback(async (fields: UpdateUserFields) => {
    const current = await authApi.updateUser(fields);
    setUser(current);
    return current;
  }, []);

  const logout = useCallback(() => {
    authApi.logout();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: user !== null,
      authenticate,
      updateUser,
      logout,
    }),
    [user, isLoading, authenticate, updateUser, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
