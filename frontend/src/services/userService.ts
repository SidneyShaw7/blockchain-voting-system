import api from '../api/api';
import { LoginCredentials, RegistrationFormValues, UserProfileResponse } from '../types';
import { UserProfileFormValues } from '../components/SettingsPage/UserProfileSchema';

const userService = {
  register: (userData: RegistrationFormValues) => api.post('/api/user/register', userData),
  login: (loginCredentials: LoginCredentials) => api.post('/api/user/login', loginCredentials),
  logout: () => api.post('/api/user/logout'),
  refreshToken: () => api.post('/api/user/refresh-token'),
  updateProfile: (formData: UserProfileFormValues) => {
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formDataObj.append(key, value);
      }
    });

    return api.put<UserProfileResponse>('/api/user/profile', formDataObj, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default userService;
