import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrganizationResponse, AsyncState } from '../../types';
import {
  getOrganizations,
  updateOrganization,
  addOrganization,
  deleteOrganization,
  inviteUserToOrganization,
  removeUserFromOrganization,
} from './organizationsThunks';

interface OrganizationsState extends AsyncState<OrganizationResponse[]> {
  data: OrganizationResponse[];
}

const initialState: OrganizationsState = {
  data: [],
  isProcessing: false,
  isSuccess: false,
  isError: false,
  errorMessage: undefined,
};

const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    resetOrganizationState: (state) => {
      state.isProcessing = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrganization.pending, (state) => {
        state.isProcessing = true;
        state.isSuccess = false;
        state.isError = false;
        state.errorMessage = undefined;
      })
      .addCase(addOrganization.fulfilled, (state, action: PayloadAction<OrganizationResponse>) => {
        state.isProcessing = false;
        state.isSuccess = true;
        state.data.push(action.payload);
      })
      .addCase(addOrganization.rejected, (state, action) => {
        state.isProcessing = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(getOrganizations.pending, (state) => {
        state.isProcessing = true;
        state.isSuccess = false;
        state.isError = false;
        state.errorMessage = undefined;
      })
      .addCase(getOrganizations.fulfilled, (state, action: PayloadAction<OrganizationResponse[]>) => {
        state.isProcessing = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(getOrganizations.rejected, (state, action) => {
        state.isProcessing = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(updateOrganization.pending, (state) => {
        state.isProcessing = true;
        state.isSuccess = false;
        state.isError = false;
        state.errorMessage = undefined;
      })
      .addCase(updateOrganization.fulfilled, (state, action: PayloadAction<OrganizationResponse>) => {
        state.isProcessing = false;
        state.isSuccess = true;
        const index = state.data?.findIndex((org) => org.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateOrganization.rejected, (state, action) => {
        state.isProcessing = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(deleteOrganization.pending, (state) => {
        state.isProcessing = true;
        state.isSuccess = false;
        state.isError = false;
        state.errorMessage = undefined;
      })
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.isSuccess = true;
        state.data = state.data.filter((org) => org.id !== action.meta.arg);
      })
      .addCase(deleteOrganization.rejected, (state, action) => {
        state.isProcessing = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(inviteUserToOrganization.pending, (state) => {
        state.isProcessing = true;
        state.isSuccess = false;
        state.isError = false;
        state.errorMessage = undefined;
      })
      .addCase(inviteUserToOrganization.fulfilled, (state) => {
        state.isProcessing = false;
        state.isSuccess = true;
      })
      .addCase(inviteUserToOrganization.rejected, (state, action) => {
        state.isProcessing = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(removeUserFromOrganization.pending, (state) => {
        state.isProcessing = true;
        state.isSuccess = false;
        state.isError = false;
        state.errorMessage = undefined;
      })
      .addCase(removeUserFromOrganization.fulfilled, (state) => {
        state.isProcessing = false;
        state.isSuccess = true;
      })
      .addCase(removeUserFromOrganization.rejected, (state, action) => {
        state.isProcessing = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { resetOrganizationState } = organizationsSlice.actions;
export default organizationsSlice.reducer;
