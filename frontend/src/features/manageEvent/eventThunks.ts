import { createAsyncThunk } from '@reduxjs/toolkit';
import { eventService } from '../../services';
import { VotingEventFormValues } from '../../types';
import { processError } from '../../utils/helpers';

// create
export const createEvent = createAsyncThunk<VotingEventFormValues, VotingEventFormValues, { rejectValue: string }>(
  'event/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await eventService.createEvent(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

// // update
// export const updateEvent = createAsyncThunk<VotingEventFormValues, { eventId: string; formData: VotingEventFormValues }, { rejectValue: string }>(
//   'event/update',
//   async ({ eventId, formData }, { rejectWithValue }) => {
//     try {
//       return await eventService.updateEvent(eventId, formData);
//     } catch (error) {
//       return rejectWithValue(processError(error));
//     }
//   }
// );

// delete
export const deleteEvent = createAsyncThunk<void, string, { rejectValue: string }>('event/delete', async (eventId, { rejectWithValue }) => {
  try {
    await eventService.deleteEvent(eventId);
  } catch (error) {
    return rejectWithValue(processError(error));
  }
});

// get
export const getEvent = createAsyncThunk<VotingEventFormValues, string, { rejectValue: string }>(
  'event/get',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await eventService.getEvent(eventId);
      return response.data;
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

// vote
export const voteOnEvent = createAsyncThunk<void, { eventId: string; optionId: string }, { rejectValue: string }>(
  'event/vote',
  async ({ eventId, optionId }, { rejectWithValue }) => {
    try {
      await eventService.voteOnEvent(eventId, optionId);
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);