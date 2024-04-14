import { createSlice } from '@reduxjs/toolkit';
import { login } from './loginThunks';
import { LogInState } from '../../types';

const initialState: LogInState = {
  loggingIn: false,
  loggedIn: false,
  user: null,
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

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
