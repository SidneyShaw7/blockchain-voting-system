import api from '../api/api';
import { OrganizationFormValues, OrganizationResponse } from '../types';

const organizationsService = {
  getOrganizations: () => api.get<OrganizationResponse[]>('/api/organizations'),
  updateOrganization: (id: string, formData: OrganizationFormValues) => {
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formDataObj.append(key, value);
      }
    });

    return api.put<OrganizationResponse>(`/api/organizations/${id}`, formDataObj, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default organizationsService;
