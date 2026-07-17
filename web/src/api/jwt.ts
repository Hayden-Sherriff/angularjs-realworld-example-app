// Token persistence, ported from src/js/services/jwt.service.js.
// Backed by localStorage under the AppConstants.jwtKey key.
import AppConstants from '@/config/constants';

export const JWT = {
  save(token: string): void {
    localStorage.setItem(AppConstants.jwtKey, token);
  },

  get(): string | null {
    return localStorage.getItem(AppConstants.jwtKey);
  },

  destroy(): void {
    localStorage.removeItem(AppConstants.jwtKey);
  },
};

export default JWT;
