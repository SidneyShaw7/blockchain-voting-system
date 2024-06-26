import { Types, Document } from 'mongoose';

export interface UserRole {
  userId: Types.ObjectId;
  role: string;
}

export interface OrganizationValues extends Document {
  name: string;
  location: string;
  description: string;
  logo?: string;
  userCount: number;
  billingInfo: string;
  billingEmail: string;
  createdBy: Types.ObjectId;
  users: UserRole[];
}

export interface OrganizationResponse {
  id: string;
  name: string;
  location: string;
  description: string;
  logo?: string;
  role: string;
  userCount: number;
  billingInfo: string;
  billingEmail: string;
  createdBy: Types.ObjectId;
  invitedPersons: Types.ObjectId[];
}

export interface OrganizationInput {
  name: string;
  location: string;
  description: string;
  logo?: string;
  role: string;
  billingInfo: string;
  billingEmail: string;
}
