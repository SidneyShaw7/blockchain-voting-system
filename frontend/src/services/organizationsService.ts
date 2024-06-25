import api from '../api/api';
import { OrganizationFormValues, OrganizationResponse } from '../types';

const organizationsService = {
  getOrganizations: () => api.get<OrganizationResponse[]>('/api/organizations'),
  addOrganization: (formData: OrganizationFormValues) => {
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formDataObj.append(key, value);
      }
    });

    return api.post<OrganizationResponse>('/api/organizations/create', formDataObj, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  updateOrganization: (organizationId: string, formData: OrganizationFormValues) => {
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formDataObj.append(key, value);
      }
    });

    return api.put<OrganizationResponse>(`/api/organizations/${organizationId}`, formDataObj, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteOrganization: (organizationId: string) => {
    return api.delete<void>(`/api/organizations/${organizationId}`);
  },

  inviteUserToOrganization: (organizationId: string, email: string) => {
    return api.post<void>(`/api/organizations/${organizationId}/invite`, { email });
  },

  removeUserFromOrganization: (organizationId: string, userId: string) => {
    return api.delete<void>(`/api/organizations/${organizationId}/users/${userId}`);
  },

  leaveOrganization: (organizationId: string) => {
    return api.post<void>(`/api/organizations/${organizationId}/leave`);
  },
};

export default organizationsService;
