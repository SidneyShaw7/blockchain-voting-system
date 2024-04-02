import axios from 'axios';
const baseUrl = '/api/login';
import { LoginCredentials } from '../types';

const login = async (credentials: LoginCredentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
