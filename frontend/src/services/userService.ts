import api from '../api/api';
import { LoginCredentials, RegistrationForm } from '../types';

const userService = {
  register: (userData: RegistrationForm) => {
    return api.post('/api/users/register', userData);
    
  },
  login: (loginCredentials: LoginCredentials) => {
    return api.post('/api/users/login', loginCredentials);
  },
  logout: () => {
    return api.post('/api/users/logout');
  },
};

export default userService;
