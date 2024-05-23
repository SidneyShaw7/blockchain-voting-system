import axios from 'axios';
import { store } from '../store';
import { logout, refreshToken } from '../features/login';

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

api.interceptors.request.use((request) => {
  return request;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          await axios.post(`${apiUrl}/refresh-token`, {}, { withCredentials: true });
          store.dispatch(refreshToken());
          return axios(originalRequest);
        } catch (error) {
          store.dispatch(logout());
          window.location.href = '/login';
        }
      } else if (error.response.status === 500) {
        console.error('A server error occurred. Please try again later.');
      }
    } else if (error.request) {
      console.error('API No Response: ', error.request);
    } else {
      console.error('API Error: ', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
