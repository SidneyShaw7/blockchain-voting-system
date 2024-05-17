import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout } from './loginThunks';
import { AuthResponse, AsyncState } from '../../types';
import { createAsyncReducers } from '../../utils/reducerUtils';

interface LoginState extends AsyncState<AuthResponse> {}

const initialState: LoginState = {
  isProcessing: false,
  isSuccess: false,
  isError: false,
  errorMessage: undefined,
  data: null,
};

const { pending, rejected } = createAsyncReducers<AuthResponse>();

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, pending)
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isProcessing = false;
        state.isSuccess = true;
        state.isError = false;
        state.data = action.payload;
        console.log('Login fulfilled, state:', state);

      })
      .addCase(login.rejected, rejected)
      .addCase(logout.pending, pending)
      .addCase(logout.fulfilled, (state) => {
        state.isProcessing = false;
        state.isSuccess = false;
        state.data = null;
      })
      .addCase(logout.rejected, rejected);
  },
});

export default loginSlice.reducer;
