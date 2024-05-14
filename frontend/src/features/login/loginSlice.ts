import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login } from './loginThunks';
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
      .addCase(login.rejected, rejected);
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
