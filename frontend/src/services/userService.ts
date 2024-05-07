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

// async function fetchApi(endpoint: string, options: RequestInit) {
//   const response = await fetch(`${apiUrl}${endpoint}`, options);
//   const data = await handleResponse(response);
//   if (!response.ok) {
//     console.log(data);
//     console.log(data.details.detail);
//     throw new Error(data.details.detail);
//   }
//   return data;
// }

// async function handleResponse(response: Response) {
//   const text = await response.text();
//   return text ? JSON.parse(text) : {};
// }

// // const register = async (userData: RegistrationForm) => {
// //   try {
// //     const requestOptions = {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(userData),
// //     };
// //     const response = await fetch(`${apiUrl}/api/users/register`, requestOptions);
// //     return handleResponse(response);
// //   } catch (error) {
// //     console.error('Registration failed', error);
// //   }
// // };

// const register = async (userData: RegistrationForm) => {
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(userData),
//   };
//   return fetchApi('/api/users/register', requestOptions);
// };

// // const login = async (loginCredentials: LoginCredentials) => {
// //   try {
// //     const requestOptions = {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(loginCredentials),
// //     };
// //     const response = await fetch(`${apiUrl}/api/users/login`, requestOptions);
// //     const userData = await handleResponse(response);
// //     localStorage.setItem('user', JSON.stringify(userData));
// //     return userData;
// //   } catch (error) {
// //     console.error('Login failed', error);
// //   }
// // };

// const login = async (loginCredentials: LoginCredentials) => {
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(loginCredentials),
//   };
//   return fetchApi('/api/users/login', requestOptions);
// };

// // const logout = async () => {
// //   try {
// //     const response = await fetch(`${apiUrl}/api/users/logout`, { method: 'POST' });
// //     if (!response.ok) {
// //       throw new Error('Logout failed on the server');
// //     }
// //     localStorage.removeItem('user');
// //   } catch (error) {
// //     console.error('Logout failed', error);
// //     throw error;
// //   }
// // };

// const logout = async () => {
//   await fetchApi('/api/users/logout', { method: 'POST' });
// };

// // async function handleResponse(response: Response) {
// //   const text = await response.text();
// //   const data = text ? JSON.parse(text) : null;
// //   if (!response.ok) {
// //     if (response.status === 401) {
// //       // auto logout if 401 response returned from api
// //       logout();
// //       location.reload();
// //     }
// //     const error = (data && data.message) || response.statusText;
// //     return Promise.reject(error);
// //   }
// //   return data;
// // }

// export const userService = {
//   register,
//   login,
//   logout,
// };
