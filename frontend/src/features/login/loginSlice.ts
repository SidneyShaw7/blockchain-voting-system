import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout } from './loginThunks';
import { AuthResponse, AsyncState, User } from '../../types';
import { createAsyncReducers } from '../../utils/reducerUtils';

interface LoginState extends AsyncState<AuthResponse> {
  isAuthenticated: boolean;
}

const initialState: LoginState = {
  isProcessing: false,
  isSuccess: false,
  isError: false,
  errorMessage: undefined,
  data: null,
  isAuthenticated: false,
};

const { pending, fulfilled, rejected } = createAsyncReducers<AuthResponse>();

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetLoginState: () => initialState,
    refreshToken: () => {},
    logout: () => initialState,
    updatePersistedUserData: (state, action: PayloadAction<User>) => {
      if (state.data) {
        state.data.user = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, pending)
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        fulfilled(state, action);
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, rejected)
      .addCase(logout.pending, pending)
      .addCase(logout.fulfilled, (state) => {
        state.isProcessing = false;
        state.isSuccess = false;
        state.data = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, rejected);
  },
});

export const { refreshToken, resetLoginState, updatePersistedUserData } = loginSlice.actions;

export default loginSlice.reducer;
