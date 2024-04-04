import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, LogInState } from '../types';

const initialState: LogInState = {
  loggingIn: false,
  loggedIn: false,
  user: null,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loggingIn = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.loggingIn = false;
      state.loggedIn = true;
      state.user = action.payload;
    },
    loginFailure(state) {
      state.loggingIn = false;
      state.loggedIn = false;
      state.user = null;
    },
    logout() {
      return initialState;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
