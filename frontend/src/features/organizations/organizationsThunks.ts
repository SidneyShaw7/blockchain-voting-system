import { createAsyncThunk } from '@reduxjs/toolkit';
import { organizationsService } from '../../services';
import { OrganizationResponse, OrganizationFormValues, SimpleUser } from '../../types';
import { processError } from '../../utils/helpers';

export const addOrganization = createAsyncThunk<OrganizationResponse[], OrganizationFormValues, { rejectValue: string }>(
  'organizations/add',
  async (formData, { rejectWithValue }) => {
    try {
      await organizationsService.addOrganization(formData);
      const response = await organizationsService.getOrganizations();
      return response.data;
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const getOrganization = createAsyncThunk<OrganizationResponse, string>(
  'organizations/getOrganization',
  async (organizationId, { rejectWithValue }) => {
    try {
      const response = await organizationsService.getOrganization(organizationId);
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

export const updateOrganization = createAsyncThunk<OrganizationResponse[], { id: string; formData: OrganizationFormValues }, { rejectValue: string }>(
  'organizations/update',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      await organizationsService.updateOrganization(id, formData);
      const response = await organizationsService.getOrganizations();
      return response.data;
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const deleteOrganization = createAsyncThunk<OrganizationResponse[], string, { rejectValue: string }>(
  'organizations/delete',
  async (organizationId, { rejectWithValue }) => {
    try {
      await organizationsService.deleteOrganization(organizationId);
      const response = await organizationsService.getOrganizations();
      return response.data;
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const inviteUserToOrganization = createAsyncThunk<
  OrganizationResponse[],
  { organizationId: string; email: string; role: string },
  { rejectValue: string }
>('organizations/inviteUser', async ({ organizationId, email, role }, { rejectWithValue }) => {
  try {
    await organizationsService.inviteUserToOrganization(organizationId, email, role);
    const response = await organizationsService.getOrganizations();
    return response.data;
  } catch (error) {
    return rejectWithValue(processError(error));
  }
});

export const removeUserFromOrganization = createAsyncThunk<
  OrganizationResponse[],
  { organizationId: string; userId: string },
  { rejectValue: string }
>('organizations/removeUser', async ({ organizationId, userId }, { rejectWithValue }) => {
  try {
    await organizationsService.removeUserFromOrganization(organizationId, userId);
    const response = await organizationsService.getOrganizations();
    return response.data;
  } catch (error) {
    return rejectWithValue(processError(error));
  }
});

export const leaveOrganization = createAsyncThunk<OrganizationResponse[], string, { rejectValue: string }>(
  'organizations/leave',
  async (organizationId, { rejectWithValue }) => {
    try {
      await organizationsService.leaveOrganization(organizationId);
      const response = await organizationsService.getOrganizations();
      return response.data;
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);

export const getOrganizationUsers = createAsyncThunk<SimpleUser[], string, { rejectValue: string }>(
  'organizations/getUsers',
  async (organizationId, { rejectWithValue }) => {
    try {
      const response = await organizationsService.getOrganizationUsers(organizationId);
      return response.data;
    } catch (error) {
      return rejectWithValue(processError(error));
    }
  }
);