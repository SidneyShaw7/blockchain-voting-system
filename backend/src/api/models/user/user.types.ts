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
