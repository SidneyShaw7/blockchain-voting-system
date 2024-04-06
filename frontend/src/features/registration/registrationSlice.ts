import { createSlice } from '@reduxjs/toolkit';
import { register } from './registrationThunks';
import { RegistrationState } from '../../types';

const initialState: RegistrationState = {
  isRegistering: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  user: null,
};

const registrationSlice = createSlice({
  name: 'registration',
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isRegistering = true;
        state.isSuccess = false;
        state.isError = false;
        state.errorMessage = '';
        state.user = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isRegistering = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        state.errorMessage = '';
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

export default registrationSlice.reducer;
