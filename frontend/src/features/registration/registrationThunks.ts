import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services';
import { User, RegistrationFormValues } from '../../types';
import { login } from '../login/loginThunks';
import { processError } from '../../utils/helpers';

export const register = createAsyncThunk<User, RegistrationFormValues, { rejectValue: string }>(
  'authentication/register',
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const response = await userService.register(formData);

      await dispatch(login({ username: formData.username, password: formData.password })).unwrap();

      return response.data;
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);
