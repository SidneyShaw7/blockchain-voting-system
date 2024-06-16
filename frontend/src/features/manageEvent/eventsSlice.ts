import { createSlice } from '@reduxjs/toolkit';
import { getAllEvents } from './eventThunks';
import { VotingEventFormValuesDB, AsyncState } from '../../types';
import { createAsyncReducers } from '../../utils/reducerUtils';

const initialState: AsyncState<VotingEventFormValuesDB[]> = {
  isProcessing: false,
  isSuccess: false,
  isError: false,
  errorMessage: undefined,
  data: [],
};

const { pending, fulfilled, rejected } = createAsyncReducers<VotingEventFormValuesDB[]>();

const eventsSlice = createSlice({
  name: 'userEvents',
  initialState,
  reducers: {
    resetEventsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllEvents.pending, pending).addCase(getAllEvents.fulfilled, fulfilled).addCase(getAllEvents.rejected, rejected);
  },
});

export const { resetEventsState } = eventsSlice.actions;
export default eventsSlice.reducer;
