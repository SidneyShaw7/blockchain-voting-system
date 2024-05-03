import { User } from '../models/user';
import { IUser, IUserResponse } from '../types';
import jwt from 'jsonwebtoken';

export const registerUser = async (userData: IUser): Promise<{ user: IUserResponse; token: string }> => {
  const { firstName, lastName, username, email, password } = userData;
  const newUser = new User({
    firstName,
    lastName,
    username,
    email,
    password,
  });

  await newUser.save();

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  const userResponse: IUserResponse = {
    firstName,
    lastName,
    username,
    email,
  };
  
  return {
    user: userResponse,
    token,
  };
};
