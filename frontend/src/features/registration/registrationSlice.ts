import { createSlice } from '@reduxjs/toolkit';
import { register } from './registrationThunks';
import { RegistrationState } from '../../types';

const initialState: RegistrationState = {
  isRegistering: false,
  isSuccess: false,
  isError: false,
  errorMessage: undefined,
  user: null,
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    resetRegistrationState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isRegistering = true;
        state.isSuccess = false;
        state.isError = false;
        state.errorMessage = undefined;
        state.user = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isRegistering = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        state.errorMessage = undefined;
      })
      .addCase(register.rejected, (state, action) => {
        state.isRegistering = false;
        state.isSuccess = false;
        state.isError = true;
        state.user = null;
        state.errorMessage = action.payload || 'Failed to register';
      });
  },
});

export const { resetRegistrationState } = registrationSlice.actions;
export default registrationSlice.reducer;
