import axios from 'axios';

export const BASE_URL = 'http://localhost:3000';

export const appInstance = axios.create({
  baseURL: BASE_URL,
});

appInstance.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('token');

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

appInstance.interceptors.response.use(
  (config) => config,
  async (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      if (window) {
        window.location.reload();
      }
    }

    throw error;
  },
);
