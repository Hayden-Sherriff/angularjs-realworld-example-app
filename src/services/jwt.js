import config from '../config';

const jwt = {
  save(token) {
    window.localStorage.setItem(config.jwtKey, token);
  },

  get() {
    return window.localStorage.getItem(config.jwtKey);
  },

  destroy() {
    window.localStorage.removeItem(config.jwtKey);
  },
};

export default jwt;
