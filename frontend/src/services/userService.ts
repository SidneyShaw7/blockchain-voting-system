import api from '../api/api';
import { LoginCredentials, RegistrationForm } from '../types';

const userService = {
  register: (userData: RegistrationForm) => api.post('/api/users/register', userData),
  login: (loginCredentials: LoginCredentials) => api.post('/api/users/login', loginCredentials),
  logout: () => api.post('/api/users/logout'),
  refreshToken: () => api.post('/auth/refresh-token'),
};

export default userService;
