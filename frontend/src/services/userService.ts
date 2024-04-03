// import { authHeader } from '../helpers';
import { LoginCredentials } from '../types';

const apiUrl = import.meta.env.API_URL;

const register = async (user: LoginCredentials) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  const response = await fetch(`${apiUrl}/users/register`, requestOptions);
  return handleResponse(response);
};

const login = async ({ username, password }: LoginCredentials) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  const response = await fetch(`${apiUrl}/users/authenticate`, requestOptions);
  const user = await handleResponse(response);
  localStorage.setItem('user', JSON.stringify(user));
  return user;
};

const logout = () => {
  // removing user from local storage to log user out
  localStorage.removeItem('user');
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
