import api from './api';
import jwt from './jwt';

const Auth = {
  /**
   * @param {'login' | 'register'} type
   * @param {{ email: string, password: string, username?: string }} credentials
   * @returns {Promise<object>} user
   */
  attemptAuth(type, credentials) {
    const route = type === 'login' ? '/users/login' : '/users';
    return api.post(route, { user: credentials }).then((res) => {
      jwt.save(res.data.user.token);
      return res.data.user;
    });
  },

  /** @returns {Promise<object>} user */
  update(fields) {
    return api.put('/user', { user: fields }).then((res) => res.data.user);
  },

  /**
   * Verify the current JWT is still valid by fetching /user.
   * @returns {Promise<object|null>} user or null if unauthenticated
   */
  verifyAuth() {
    const token = jwt.get();
    if (!token) return Promise.resolve(null);
    return api
      .get('/user')
      .then((res) => res.data.user)
      .catch(() => {
        jwt.destroy();
        return null;
      });
  },
};

export default Auth;
