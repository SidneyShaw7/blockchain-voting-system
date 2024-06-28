export interface OrganizationFormValues {
  name: string;
  location: string;
  description?: string;
  logo?: File;
  billingInfo: string;
  billingEmail: string;
  users: { userId: string; role: string }[];
}

export interface OrganizationResponse extends OrganizationFormValues {
  id: string;
  userCount: number;
  createdBy: string;
  // users: { userId: string; role: string }[];
}
