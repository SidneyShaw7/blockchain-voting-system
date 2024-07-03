import { createAsyncThunk } from '@reduxjs/toolkit';
import { organizationsService } from '../../services';
import { OrganizationResponse, OrganizationFormValues } from '../../types';
import { processError } from '../../utils/helpers';

export const addOrganization = createAsyncThunk<OrganizationResponse, OrganizationFormValues, { rejectValue: string }>(
  'organizations/add',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await organizationsService.addOrganization(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const getOrganizations = createAsyncThunk<OrganizationResponse[], void, { rejectValue: string }>(
  'organizations/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await organizationsService.getOrganizations();
      return response.data;
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const updateOrganization = createAsyncThunk<OrganizationResponse, { id: string; formData: OrganizationFormValues }, { rejectValue: string }>(
  'organizations/update',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await organizationsService.updateOrganization(id, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const deleteOrganization = createAsyncThunk<void, string, { rejectValue: string }>(
  'organizations/delete',
  async (organizationId, { rejectWithValue }) => {
    try {
      await organizationsService.deleteOrganization(organizationId);
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const inviteUserToOrganization = createAsyncThunk<void, { organizationId: string; email: string; role: string }, { rejectValue: string }>(
  'organizations/inviteUser',
  async ({ organizationId, email, role }, { rejectWithValue }) => {
    try {
      await organizationsService.inviteUserToOrganization(organizationId, email, role);
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const removeUserFromOrganization = createAsyncThunk<void, { organizationId: string; userId: string }, { rejectValue: string }>(
  'organizations/removeUser',
  async ({ organizationId, userId }, { rejectWithValue }) => {
    try {
      await organizationsService.removeUserFromOrganization(organizationId, userId);
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const leaveOrganization = createAsyncThunk<void, string, { rejectValue: string }>(
  'organizations/leave',
  async (organizationId, { rejectWithValue }) => {
    try {
      await organizationsService.leaveOrganization(organizationId);
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);
