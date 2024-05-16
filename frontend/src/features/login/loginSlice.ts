import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout } from './loginThunks';
import { User } from '../../types';
import { AsyncState } from '../../types';
import { createAsyncReducers } from '../../utils/reducerUtils';

const initialState: AsyncState<User | null> = {
  isProcessing: false,
  isSuccess: false,
  isError: false,
  errorMessage: undefined,
  data: null,
};

const { pending, rejected } = createAsyncReducers<User | null>();

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, pending)
      .addCase(login.fulfilled, (state, action: PayloadAction<User | null>) => {
        state.isProcessing = false;
        state.isSuccess = true;
        state.data = action.payload;
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
