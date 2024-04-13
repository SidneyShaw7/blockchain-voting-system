import { LoginCredentials, RegistrationForm } from '../types';

// const apiUrl = import.meta.env.API_URL;
const apiUrl = 'http://localhost:3000';

const register = async (userData: RegistrationForm) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    };
    const response = await fetch(`${apiUrl}/api/users/register`, requestOptions);
    return handleResponse(response);
  } catch (error) {
    console.error('Registration failed', error);
  }
};

const login = async (loginCredentials: LoginCredentials) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginCredentials),
    };
    const response = await fetch(`${apiUrl}/users/authenticate`, requestOptions);
    const userData = await handleResponse(response);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  } catch (error) {
    console.error('Login failed', error);
  }
};

const logout = async () => {
  try {
    const response = await fetch(`${apiUrl}/users/logout`, { method: 'POST' });
    if (!response.ok) {
      throw new Error('Logout failed on the server');
    }
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Logout failed', error);
    throw error;
  }
};

async function handleResponse(response: Response) {
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    if (response.status === 401) {
      // auto logout if 401 response returned from api
      logout();
      location.reload();
    }
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  return data;
}

export const userService = {
  register,
  login,
  logout,
};
