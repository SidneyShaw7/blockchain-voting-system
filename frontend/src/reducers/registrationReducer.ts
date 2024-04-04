import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, RegistrationState } from '../types';

const initialState: RegistrationState = {
  isRegistering: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  user: null,
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    registerRequest(state) {
      state.isRegistering = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = '';
    },
    registerSuccess(state, action: PayloadAction<User>) {
      state.isRegistering = false;
      state.isSuccess = true;
      state.isError = false;
      state.user = action.payload;
      state.errorMessage = '';
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.isRegistering = false;
      state.isSuccess = false;
      state.isError = true;
      state.user = null;
      state.errorMessage = action.payload;
    },
  },
});

export const { registerRequest, registerSuccess, registerFailure } = registrationSlice.actions;

export default registrationSlice.reducer;
