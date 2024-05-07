import { createSlice } from '@reduxjs/toolkit';
import { createEvent, deleteEvent, getEvent } from './eventThunks';
import { VotingEventFormValues } from '../../types';
import { AsyncState } from '../../types';
import { createAsyncReducers } from '../../utils/reducerUtils';

const initialState: AsyncState<VotingEventFormValues> = {
  isProcessing: false,
  isSuccess: false,
  isError: false,
  errorMessage: undefined,
  data: null,
};

const { pending, fulfilled, rejected } = createAsyncReducers<VotingEventFormValues>();

const eventSlice = createSlice({
  name: 'votingEvent',
  initialState,
  reducers: {
    resetEventState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // create
      .addCase(createEvent.pending, pending)
      .addCase(createEvent.fulfilled, (state, action) => fulfilled(state, action))
      .addCase(createEvent.rejected, (state, action) => rejected(state, action))
      // // update
      // .addCase(updateEvent.pending, pending)
      // .addCase(updateEvent.fulfilled, (state, action) => fulfilled(state, action))
      // .addCase(updateEvent.rejected, (state, action) => rejected(state, action))
      // delete
      .addCase(deleteEvent.pending, pending)
      .addCase(deleteEvent.fulfilled, (state) => {
        state.isProcessing = false;
        state.isSuccess = true;
      })
      .addCase(deleteEvent.rejected, (state, action) => rejected(state, action))
      // get
      .addCase(getEvent.pending, pending)
      .addCase(getEvent.fulfilled, fulfilled)
      .addCase(getEvent.rejected, rejected);
  },
});

export const { resetEventState } = eventSlice.actions;
export default eventSlice.reducer;
