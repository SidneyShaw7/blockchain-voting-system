import { createSlice } from '@reduxjs/toolkit';
import { createEvent, updateEvent, deleteEvent, getEvent } from './eventThunks';
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
    // create event
    builder
      .addCase(createEvent.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(createEvent.fulfilled, (state) => {
        state.isSubmitting = false;
        state.isSuccess = true;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isSubmitting = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });

    //  update event
    builder
      .addCase(updateEvent.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(updateEvent.fulfilled, (state) => {
        state.isSubmitting = false;
        state.isSuccess = true;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.isSubmitting = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });

    // delete event
    builder
      .addCase(deleteEvent.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(deleteEvent.fulfilled, (state) => {
        state.isSubmitting = false;
        state.isSuccess = true;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isSubmitting = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });

    // get event
    builder
      .addCase(getEvent.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.isSuccess = true;
        state.eventData = action.payload;
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.isSubmitting = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { resetEventState } = eventSlice.actions;
export default eventSlice.reducer;
