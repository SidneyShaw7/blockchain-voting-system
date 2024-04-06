import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services';
import { User, RegistrationForm } from '../../types';

export const register = createAsyncThunk<User, RegistrationForm, { rejectValue: string }>(
  'authentication/register',
  async (formData, { rejectWithValue }) => {
    try {
      const newUser = await userService.register(formData);
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
