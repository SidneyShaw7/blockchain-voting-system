import { createAsyncThunk } from '@reduxjs/toolkit';
import { eventService } from '../../services';
import { VotingEventFormValues } from '../../types';

// create
export const createEvent = createAsyncThunk<void, VotingEventFormValues, { rejectValue: string }>(
  'event/create',
  async (formData, { rejectWithValue }) => {
    try {
      await eventService.createEvent(formData);
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred during event creation.';
      if (typeof error === 'object' && error !== null && 'message' in error) {
        const message = (error as { message: unknown }).message;
        if (typeof message === 'string') {
          errorMessage = message;
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateEvent = createAsyncThunk<void, { eventId: string; formData: VotingEventFormValues }, { rejectValue: string }>(
  'event/update',
  async ({ eventId, formData }, { rejectWithValue }) => {
    try {
      await eventService.updateEvent(eventId, formData);
    } catch (error: unknown) {
      let errorMessage = 'Failed to update the event.';
      if (typeof error === 'object' && error !== null && 'message' in error) {
        const message = (error as { message: unknown }).message;
        if (typeof message === 'string') {
          errorMessage = message;
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteEvent = createAsyncThunk<void, string, { rejectValue: string }>(
  'event/delete',
  async (eventId, { rejectWithValue }) => {
    try {
      await eventService.deleteEvent(eventId);
    } catch (error: unknown) {
      let errorMessage = 'Failed to delete the event.';
      if (typeof error === 'object' && error !== null && 'message' in error) {
        const message = (error as { message: unknown }).message;
        if (typeof message === 'string') {
          errorMessage = message;
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const getEvent = createAsyncThunk<VotingEventFormValues, string, { rejectValue: string }>(
  'event/get',
  async (eventId, { rejectWithValue }) => {
    try {
      return await eventService.getEvent(eventId);
    } catch (error: unknown) {
      let errorMessage = 'Failed to fetch the event details.';
      if (typeof error === 'object' && error !== null && 'message' in error) {
        const message = (error as { message: unknown }).message;
        if (typeof message === 'string') {
          errorMessage = message;
        }
      }
      return rejectWithValue(errorMessage);
    }
  }
);
