import { Types, Document } from 'mongoose';
import { User } from './';

export interface OrganizationValues extends Document {
  name: string;
  location: string;
  description: string;
  logo?: string;
  role: string;
  userCount: number;
  billingInfo: string;
  billingEmail: string;
  createdBy: Types.ObjectId | User;
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
  createdBy: {
    id: string;
    firstName: string;
    lastName: string;
  };
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
