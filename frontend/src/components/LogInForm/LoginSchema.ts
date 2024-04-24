import * as Yup from 'yup';
// import { LoginCredentials } from '../../types';

export const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username or Email is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long'),
  email: Yup.string().email('Invalid email format').optional(),
  rememberMe: Yup.boolean(),
});
