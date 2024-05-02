import 'express';
import { IUser } from '../models/user';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
    user?: IUser;
  }
}
