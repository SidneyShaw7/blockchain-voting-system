import { Types } from 'mongoose';
import { OrganizationValues } from './organization.types';

export interface User extends Document {
  id: Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  avatar?: Buffer | string;
  events?: Types.ObjectId[];
  organizations?: Types.ObjectId[];
}

export interface UserProfileValues {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  newPassword?: string;
  avatar?: string;
  organizations?: OrganizationValues[];
}

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar?: string;
  events?: string[];
  organizations?: OrganizationValues[];
}

export interface UserRegistration {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email?: string;
  username?: string;
  password: string;
}

export interface SimpleUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}