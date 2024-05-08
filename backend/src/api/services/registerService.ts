import { UserModel } from '../models/user';
import { UserResponse, UserRegistration } from '../types';
import jwt from 'jsonwebtoken';

export const registerUser = async (userData: UserRegistration): Promise<{ user: UserResponse; token: string }> => {
  const { firstName, lastName, username, email, password } = userData;
  const newUser = new UserModel({
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

  const userResponse: UserResponse = {
    id: newUser._id.toString(),
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
