import { createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../services/userService';
import { UserProfileResponse, UserProfileFormValues } from '../../types';
import { processError } from '../../utils/helpers';

export const updateUserProfile = createAsyncThunk<UserProfileResponse, UserProfileFormValues, { rejectValue: string }>(
  'userProfile/update',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await userService.updateProfile(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);
