import { Types } from 'mongoose';

export interface User {
  id?: Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  avatar?: Buffer | string;
  events?: Types.ObjectId[];
}

export interface UserProfileValues extends User {
  newPassword?: string;
}

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar?: string;
  events?: string[];
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
