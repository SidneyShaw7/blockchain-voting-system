import { createAsyncThunk } from '@reduxjs/toolkit';
import organizationService from '../../services/organizationsService';
import { OrganizationResponse, OrganizationFormValues } from '../../types';
import { processError } from '../../utils/helpers';

export const addOrganization = createAsyncThunk<OrganizationResponse, OrganizationFormValues, { rejectValue: string }>(
  'organizations/add',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await organizationService.addOrganization(formData);
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
      const response = await organizationService.getOrganizations();
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
      const response = await organizationService.updateOrganization(id, formData);
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
      await organizationService.deleteOrganization(organizationId);
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const inviteUserToOrganization = createAsyncThunk<void, { organizationId: string; email: string }, { rejectValue: string }>(
  'organizations/inviteUser',
  async ({ organizationId, email }, { rejectWithValue }) => {
    try {
      await organizationService.inviteUserToOrganization(organizationId, email);
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const removeUserFromOrganization = createAsyncThunk<void, { organizationId: string; userId: string }, { rejectValue: string }>(
  'organizations/removeUser',
  async ({ organizationId, userId }, { rejectWithValue }) => {
    try {
      await organizationService.removeUserFromOrganization(organizationId, userId);
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);
