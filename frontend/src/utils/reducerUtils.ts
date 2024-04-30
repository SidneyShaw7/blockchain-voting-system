import { PayloadAction } from '@reduxjs/toolkit';
import { AsyncState } from '../types';

export const createAsyncReducers = <T>() => {
  return {
    pending: (state: AsyncState<T>) => {
      state.isProcessing = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = undefined;
    },
    fulfilled: (state: AsyncState<T>, action: PayloadAction<T>) => {
      state.isProcessing = false;
      state.isSuccess = true;
      state.isError = false;
      state.data = action.payload;
    },
    rejected: (state: AsyncState<T>, action: PayloadAction<string | undefined>) => {
      state.isProcessing = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload || 'An error occurred';
    },
  };
};
