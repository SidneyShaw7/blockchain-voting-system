import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfileResponse } from '../../types';
import { updateUserProfile } from './userProfileThunks';

interface ProfileState {
  data: UserProfileResponse | null;
  isProcessing: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string | undefined;
}

const initialState: ProfileState = {
  data: null,
  isProcessing: false,
  isSuccess: false,
  isError: false,
  errorMessage: undefined,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isProcessing = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isProcessing = true;
        state.isSuccess = false;
        state.isError = false;
        state.errorMessage = undefined;
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<UserProfileResponse>) => {
        state.isProcessing = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isProcessing = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { clearState } = userProfileSlice.actions;
export default userProfileSlice.reducer;
