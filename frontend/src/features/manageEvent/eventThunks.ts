import { createAsyncThunk } from '@reduxjs/toolkit';
import { eventService } from '../../services';
import { VotingEventFormValues, VotingEventFormValuesDB } from '../../types';
import { processError } from '../../utils/helpers';

export const createEvent = createAsyncThunk<VotingEventFormValuesDB, VotingEventFormValues, { rejectValue: string }>(
  'event/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await eventService.createEvent(formData);
      console.log(response.data.id);
      console.log(response.data);
      return response.data.event;
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const updateEvent = createAsyncThunk<VotingEventFormValuesDB, { eventId: string; formData: VotingEventFormValuesDB }, { rejectValue: string }>(
  'event/update',
  async ({ eventId, formData }, { rejectWithValue }) => {
    try {
      const response = await eventService.updateEvent(eventId, formData);
      return response.data.event;
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const deleteEvent = createAsyncThunk<void, string, { rejectValue: string }>('event/delete', async (eventId, { rejectWithValue }) => {
  try {
    await eventService.deleteEvent(eventId);
  } catch (error) {
    return rejectWithValue(processError(error));
  }
});

export const getEvent = createAsyncThunk<VotingEventFormValuesDB, string, { rejectValue: string }>(
  'event/get',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await eventService.getEvent(eventId);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const voteOnEvent = createAsyncThunk<void, { eventId: string; optionId: string }, { rejectValue: string }>(
  'event/vote',
  async ({ eventId, optionId }, { rejectWithValue }) => {
    if (!eventId) {
      return rejectWithValue('Event ID is required');
    }
    try {
      await eventService.voteOnEvent(eventId, optionId);
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const getAllEvents = createAsyncThunk<VotingEventFormValuesDB[], void, { rejectValue: string }>(
  'event/getAllEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await eventService.getAllEvents();
      return response.data;
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const inviteUser = createAsyncThunk<void, { eventId: string; email: string }, { rejectValue: string }>(
  'event/inviteUser',
  async ({ eventId, email }, { rejectWithValue }) => {
    try {
      await eventService.inviteUser(eventId, email);
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const deleteUserFromEvent = createAsyncThunk<void, { eventId: string; userId: string }, { rejectValue: string }>(
  'event/deleteUserFromEvent',
  async ({ eventId, userId }, { rejectWithValue }) => {
    try {
      await eventService.deleteUserFromEvent(eventId, userId);
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const inviteGroupToEvent = createAsyncThunk<void, { eventId: string; organizationId: string }, { rejectValue: string }>(
  'events/inviteGroupToEvent',
  async ({ eventId, organizationId }, { rejectWithValue }) => {
    try {
      console.log(eventId);

      await eventService.inviteGroupToEvent(eventId, organizationId);
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);
