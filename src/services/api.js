import axios from 'axios';
import config from '../config';
import jwt from './jwt';

const api = axios.create({
  baseURL: config.api,
});

api.interceptors.request.use((reqConfig) => {
  const token = jwt.get();
  if (token) {
    reqConfig.headers.Authorization = `Token ${token}`;
  }
  return reqConfig;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      jwt.destroy();
      window.location.replace('/');
    }
    return Promise.reject(error);
  },
);

export default api;
