import { createSlice } from '@reduxjs/toolkit';
import { login } from './loginThunks';
import { LoginState } from '../../types';

const initialState: LoginState = {
  loggingIn: false,
  isSuccess: false,
  isError: false,
  user: null,
  errorMessage: undefined,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loggingIn = true;
        state.isSuccess = false;
        state.isError = false;
        state.user = null;
        state.errorMessage = undefined;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loggingIn = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        state.errorMessage = undefined;
      })
      .addCase(login.rejected, (state, action) => {
        state.loggingIn = false;
        state.isSuccess = false;
        state.isError = true;
        state.user = null;
        state.errorMessage = action.payload || 'Failed to login';
      });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
