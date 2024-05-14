import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services';
import { User, LoginCredentials } from '../../types';
import { processError } from '../../utils/helpers';

export const login = createAsyncThunk<User, LoginCredentials, { rejectValue: string }>(
  'authentication/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await userService.login(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const logout = createAsyncThunk<void, void, { rejectValue: string }>('authentication/logout', async (_, { rejectWithValue }) => {
  try {
    await userService.logout();
    sessionStorage.clear();
  } catch (error) {
    return rejectWithValue(processError(error));
  }
});
