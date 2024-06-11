export interface OrganizationFormValues {
  name: string;
  location: string;
  description?: string;
  logo?: File;
  role: string;
}

export interface OrganizationResponse extends OrganizationFormValues {
  id: string;
  userCount: number;
  billingInfo: string;
  billingEmail: string;
}
