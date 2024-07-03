import api from '../api/api';
import { OrganizationFormValues, OrganizationResponse, SimpleUser } from '../types';

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
        if (Array.isArray(value) || typeof value === 'object') {
          formDataObj.append(key, JSON.stringify(value));
        } else {
          formDataObj.append(key, value as string | Blob);
        }
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

  inviteUserToOrganization: (organizationId: string, email: string, role: string) => {
    return api.post<void>(`/api/organizations/${organizationId}/invite`, { email, role });
  },

  removeUserFromOrganization: (organizationId: string, userId: string) => {
    return api.delete<void>(`/api/organizations/${organizationId}/users/${userId}`);
  },

  leaveOrganization: (organizationId: string) => {
    return api.post<void>(`/api/organizations/${organizationId}/leave`);
  },

  getOrganizationUsers: (organizationId: string) => {
    return api.get<SimpleUser[]>(`/api/organizations/${organizationId}/users`);
  },
};

export default organizationsService;
