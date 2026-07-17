import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

/**
 * Route guard equivalent to User.ensureAuthIs(true) used by protected states
 * (editor, settings). Renders child routes only when authenticated; otherwise
 * redirects. Waits for the initial verifyAuth() to resolve before deciding.
 *
 * `requireAuth={false}` mirrors ensureAuthIs(false): guest-only routes
 * (login, register) that redirect authenticated users to home.
 */
export function RequireAuth({
  requireAuth = true,
  redirectTo,
}: {
  requireAuth?: boolean;
  redirectTo?: string;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate
        to={redirectTo ?? '/login'}
        replace
        state={{ from: location }}
      />
    );
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to={redirectTo ?? '/'} replace />;
  }

  return <Outlet />;
}
