import { createSlice } from '@reduxjs/toolkit';
import { createEvent, deleteEvent, getEvent, voteOnEvent, updateEvent } from './eventThunks';
import { VotingEventFormValuesDB } from '../../types';
import { AsyncState } from '../../types';
import { createAsyncReducers } from '../../utils/reducerUtils';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: AsyncState<VotingEventFormValuesDB> = {
  isProcessing: false,
  isSuccess: false,
  isError: false,
  errorMessage: undefined,
  data: null,
};

const { pending, fulfilled, rejected } = createAsyncReducers<VotingEventFormValuesDB>();

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
      .addCase(createEvent.fulfilled, (state, action: PayloadAction<VotingEventFormValuesDB>) => {
        state.isProcessing = false;
        state.isSuccess = true;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(createEvent.rejected, (state, action) => rejected(state, action))
      // update
      .addCase(updateEvent.pending, pending)
      .addCase(updateEvent.fulfilled, (state, action) => fulfilled(state, action))
      .addCase(updateEvent.rejected, (state, action) => rejected(state, action))
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
      .addCase(getEvent.rejected, rejected)
      .addCase(voteOnEvent.pending, pending)
      .addCase(voteOnEvent.fulfilled, (state) => {
        state.isProcessing = false;
        state.isSuccess = true;
      })
      .addCase(voteOnEvent.rejected, rejected);
  },
});

export const { resetEventState } = eventSlice.actions;
export default eventSlice.reducer;
