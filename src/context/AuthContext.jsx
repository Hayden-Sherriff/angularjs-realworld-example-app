import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth as AuthService, jwt } from '../services';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.verifyAuth()
      .then((user) => setCurrentUser(user))
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(
    async (type, credentials) => {
      const user = await AuthService.attemptAuth(type, credentials);
      setCurrentUser(user);
      return user;
    },
    [],
  );

  const logout = useCallback(() => {
    setCurrentUser(null);
    jwt.destroy();
    navigate('/');
  }, [navigate]);

  const updateUser = useCallback(async (fields) => {
    const user = await AuthService.update(fields);
    setCurrentUser(user);
    return user;
  }, []);

  const value = useMemo(
    () => ({ currentUser, isLoading, login, logout, updateUser }),
    [currentUser, isLoading, login, logout, updateUser],
  );

  if (isLoading) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
