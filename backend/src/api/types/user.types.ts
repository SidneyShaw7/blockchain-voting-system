import { Types } from 'mongoose';

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  events?: Types.ObjectId[];
}

export interface IUserResponse {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
