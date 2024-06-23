export interface OrganizationFormValues {
  name: string;
  location: string;
  description?: string;
  logo?: File;
  role: string;
  billingInfo: string;
  billingEmail: string;
}

export interface OrganizationResponse extends OrganizationFormValues {
  id: string;
  userCount: number;
  userIds: string[];
}
