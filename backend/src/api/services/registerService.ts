import { UserModel } from '../models/user';
import { UserResponse, UserRegistration } from '../types';
import jwt from 'jsonwebtoken';
import { ErrorWithStatus } from '../utils/custom.errors';

interface CustomError extends Error {
  name: string;
}

export const registerUser = async (userData: UserRegistration): Promise<{ user: UserResponse; token: string }> => {
  const { firstName, lastName, username, email, password } = userData;

  try {
    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new ErrorWithStatus('User already exists', 409, 'USER_ALREADY_EXISTS');
    }

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
  } catch (error) {
    if (error instanceof ErrorWithStatus) {
      throw error;
    }

    if (error && (error as CustomError).name === 'ValidationError') {
      throw new ErrorWithStatus('Invalid user data', 400, 'VALIDATION_ERROR');
    }

    console.error('Unexpected error during user registration:', error);
    throw new ErrorWithStatus('An unexpected error occurred', 500, 'INTERNAL_SERVER_ERROR');
  }
};
