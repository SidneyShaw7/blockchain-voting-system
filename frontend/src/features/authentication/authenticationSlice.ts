import { createSlice } from '@reduxjs/toolkit';
import { login } from './authenticationThunks';
import { LogInState } from '../../types';

const initialState: LogInState = {
  loggingIn: false,
  loggedIn: false,
  user: null,
};

const authenticationSlice = createSlice({
  name: 'authentication',
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
        state.loggedIn = false;
        state.user = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loggingIn = false;
        state.loggedIn = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.loggingIn = false;
        state.loggedIn = false;
        state.user = null;
        // might define an error message here
      });
  },
});

export const { logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
