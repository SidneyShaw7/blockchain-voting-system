import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services';
import { User, RegistrationForm } from '../../types';
import { login } from '../login/loginThunks';
import { processError } from '../../utils/helpers';

export const register = createAsyncThunk<User, RegistrationForm, { rejectValue: string }>(
  'authentication/register',
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const newUser = await userService.register(formData);

      await dispatch(login({ username: formData.email, password: formData.password })).unwrap();

      return newUser;
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);
