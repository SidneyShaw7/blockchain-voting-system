import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

const { pending, rejected } = createAsyncReducers<VotingEventFormValuesDB[]>();

const eventsSlice = createSlice({
  name: 'userEvents',
  initialState,
  reducers: {
    resetEventsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEvents.pending, pending)
      .addCase(getAllEvents.fulfilled, (state, action: PayloadAction<VotingEventFormValuesDB[]>) => {
        state.isProcessing = false;
        state.isSuccess = true;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(getAllEvents.rejected, (state, action) => rejected(state, action));
  },
});

export const { resetEventsState } = eventsSlice.actions;
export default eventsSlice.reducer;
