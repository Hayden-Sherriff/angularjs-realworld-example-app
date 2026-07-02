import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Route guard that redirects based on auth state.
 * @param {{ requireAuth?: boolean, children: React.ReactNode }} props
 *   requireAuth=true  → logged-out users are sent to /login
 *   requireAuth=false → logged-in users are sent to /
 */
export default function ProtectedRoute({ requireAuth = true, children }) {
  const { currentUser } = useAuth();

  if (requireAuth && !currentUser) return <Navigate to="/login" replace />;
  if (!requireAuth && currentUser) return <Navigate to="/" replace />;

  return children;
}
