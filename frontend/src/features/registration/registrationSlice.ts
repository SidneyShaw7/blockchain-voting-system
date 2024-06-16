import { createSlice } from '@reduxjs/toolkit';
import { register } from './registrationThunks';
import { User, AsyncState } from '../../types';
import { createAsyncReducers } from '../../utils/reducerUtils';

const initialState: AsyncState<User | null> = {
  isProcessing: false,
  isSuccess: false,
  isError: false,
  errorMessage: undefined,
  data: null,
};

const { pending, fulfilled, rejected } = createAsyncReducers<User | null>();

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    resetRegistrationState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, pending).addCase(register.fulfilled, fulfilled).addCase(register.rejected, rejected);
  },
});

export const { resetRegistrationState } = registrationSlice.actions;
export default registrationSlice.reducer;
