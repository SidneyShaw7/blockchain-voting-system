import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services';
import { User, RegistrationForm } from '../../types';
import { login } from '../login/loginThunks';

export const register = createAsyncThunk<User, RegistrationForm, { rejectValue: string }>(
  'authentication/register',
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const newUser = await userService.register(formData);

      await dispatch(login({ username: formData.email, password: formData.password })).unwrap();

      return newUser;
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred during registration.';
      if (typeof error === 'object' && error !== null && 'message' in error) {
        const message = (error as { message: unknown }).message;
        if (typeof message === 'string') {
          errorMessage = message;
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);
