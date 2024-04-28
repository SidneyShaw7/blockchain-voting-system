import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services';
import { User, LoginCredentials } from '../../types';
import { processError } from '../../utils/helpers';

export const login = createAsyncThunk<User, LoginCredentials, { rejectValue: string }>(
  'authentication/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await userService.login(credentials);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const logout = createAsyncThunk('authentication/logout', async (_, { rejectWithValue }) => {
  try {
    await userService.logout();
    localStorage.removeItem('user');
    sessionStorage.clear();
  } catch (error) {
    return rejectWithValue(processError(error));
  }
});
