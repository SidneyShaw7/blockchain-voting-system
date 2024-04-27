import { createSlice } from '@reduxjs/toolkit';
import { createEvent } from './createEventThunks';
import { VotingEventState } from '../../types';

const initialState: VotingEventState = {
  isSubmitting: false,
  isSuccess: false,
  isError: false,
  errorMessage: undefined,
};

const eventSlice = createSlice({
  name: 'eventCreation',
  initialState,
  reducers: {
    resetEventState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.isSubmitting = true;
        state.isSuccess = false;
        state.isError = false;
        state.errorMessage = undefined;
      })
      .addCase(createEvent.fulfilled, (state) => {
        state.isSubmitting = false;
        state.isSuccess = true;
        state.isError = false;
        state.errorMessage = undefined;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isSubmitting = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload || 'Failed to create event';
      });
  },
});

export const { resetEventState } = eventSlice.actions;
export default eventSlice.reducer;
