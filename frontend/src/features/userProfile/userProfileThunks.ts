import { createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../services/userService';
import { UserProfileResponse } from '../../types';
import { processError } from '../../utils/helpers';
import { updatePersistedUserData } from '../login';
import { UserProfileFormValues } from '../../components/SettingsPage';

export const updateUserProfile = createAsyncThunk<UserProfileResponse, UserProfileFormValues, { rejectValue: string }>(
  'userProfile/update',
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const response = await userService.updateProfile(formData);
      dispatch(updatePersistedUserData(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);
