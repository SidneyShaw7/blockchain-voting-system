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
