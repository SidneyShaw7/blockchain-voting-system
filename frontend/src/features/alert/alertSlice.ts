import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertState } from '../../types';

const initialState: AlertState = {};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    success: (_state, action: PayloadAction<{ message: string }>) => {
      return { type: 'success', message: action.payload.message };
    },
    error: (_state, action: PayloadAction<{ message: string }>) => {
      return { type: 'error', message: action.payload.message };
    },
    info: (_state, action: PayloadAction<{ message: string }>) => {
      return { type: 'info', message: action.payload.message };
    },
    warning: (_state, action: PayloadAction<{ message: string }>) => {
      return { type: 'warning', message: action.payload.message };
    },
    clear: () => {
      return {};
    },
  },
});

export const { success, error, clear } = alertSlice.actions;

export default alertSlice.reducer;
