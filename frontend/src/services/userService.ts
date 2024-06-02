import api from '../api/api';
import { LoginCredentials, RegistrationFormValues, UserProfileFormValues, UserProfileResponse } from '../types';

const userService = {
  register: (userData: RegistrationFormValues) => api.post('/api/users/register', userData),
  login: (loginCredentials: LoginCredentials) => api.post('/api/users/login', loginCredentials),
  logout: () => api.post('/api/users/logout'),
  refreshToken: () => api.post('/auth/refresh-token'),
  updateProfile: (formData: UserProfileFormValues) => {
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formDataObj.append(key, value);
      }
    });

    return api.put<UserProfileResponse>('/api/users/profile', formDataObj, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default userService;
