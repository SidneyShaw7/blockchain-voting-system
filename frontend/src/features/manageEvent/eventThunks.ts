import { createAsyncThunk } from '@reduxjs/toolkit';
import { eventService } from '../../services';
import { VotingEventFormValues } from '../../types';
import { processError } from '../../utils/helpers';

// create
export const createEvent = createAsyncThunk<void, VotingEventFormValues, { rejectValue: string }>(
  'event/create',
  async (formData, { rejectWithValue }) => {
    try {
      await eventService.createEvent(formData);
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const updateEvent = createAsyncThunk<void, { eventId: string; formData: VotingEventFormValues }, { rejectValue: string }>(
  'event/update',
  async ({ eventId, formData }, { rejectWithValue }) => {
    try {
      await eventService.updateEvent(eventId, formData);
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const deleteEvent = createAsyncThunk<void, string, { rejectValue: string }>(
  'event/delete',
  async (eventId, { rejectWithValue }) => {
    try {
      await eventService.deleteEvent(eventId);
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const getEvent = createAsyncThunk<VotingEventFormValues, string, { rejectValue: string }>(
  'event/get',
  async (eventId, { rejectWithValue }) => {
    try {
      return await eventService.getEvent(eventId);
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);
