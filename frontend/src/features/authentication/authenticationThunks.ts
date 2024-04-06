import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services';
import { User, LoginCredentials } from '../../types';

export const login = createAsyncThunk<User, LoginCredentials, { rejectValue: string }>(
  'authentication/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await userService.login(credentials);
      return user;
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred';
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

export const logout = createAsyncThunk('authentication/logout', async (_, { rejectWithValue }) => {
  try {
    await userService.logout();
  } catch (error: unknown) {
    let errorMessage = 'Failed to log out';
    if (typeof error === 'object' && error !== null && 'message' in error) {
      const message = (error as { message: unknown }).message;
      if (typeof message === 'string') {
        errorMessage = message;
      }
    }
    return rejectWithValue(errorMessage);
  }
});
