// Auth / current-user API, ported from src/js/services/user.service.js.
import apiClient from './client';
import JWT from './jwt';
import type {
  LoginCredentials,
  RegisterCredentials,
  UpdateUserFields,
  User,
} from './types';

interface UserResponse {
  user: User;
}

/**
 * POST /users/login or POST /users (register).
 * On success, persists the returned JWT (equiv. attemptAuth()).
 */
export async function attemptAuth(
  type: 'login' | 'register',
  credentials: LoginCredentials | RegisterCredentials,
): Promise<User> {
  const route = type === 'login' ? '/users/login' : '/users';
  const { user } = await apiClient.post<UserResponse>(route, {
    body: { user: credentials },
  });
  JWT.save(user.token);
  return user;
}

/** PUT /user — update the current user's settings. */
export async function updateUser(fields: UpdateUserFields): Promise<User> {
  const { user } = await apiClient.put<UserResponse>('/user', {
    body: { user: fields },
  });
  return user;
}

/**
 * GET /user — fetch the currently authenticated user.
 * Skips the global 401 redirect so a stale token doesn't cause a reload loop
 * during startup auth verification (see verifyAuth in AuthContext).
 */
export async function getCurrentUser(): Promise<User> {
  const { user } = await apiClient.get<UserResponse>('/user', {
    skipAuthRedirect: true,
  });
  return user;
}

/** Clear the persisted token (equiv. logout(); navigation handled by caller). */
export function logout(): void {
  JWT.destroy();
}
