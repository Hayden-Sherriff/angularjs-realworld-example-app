// Ported from src/js/components/show-authed.directive.js.
// Conditionally renders children based on the current auth state:
//   <ShowAuthed authed>       -> shown only when logged in
//   <ShowAuthed authed={false}> -> shown only when logged out
import { useAuth } from '@/auth/useAuth';

export function ShowAuthed({
  authed = true,
  children,
}: {
  authed?: boolean;
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated === authed ? <>{children}</> : null;
}

export default ShowAuthed;
