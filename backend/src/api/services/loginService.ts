import { UserModel } from '../models/user';
import bcrypt from 'bcryptjs';
import { LoginCredentials, UserResponse } from '../types';
import { ErrorWithStatus } from '../utils/custom.errors';
import { generateAccessToken, generateRefreshToken } from './tokenService';

export const loginUser = async (
  credentials: LoginCredentials
): Promise<{ token: string; refreshToken: string; user: UserResponse }> => {
  const { email, username, password } = credentials;

  const user = await UserModel.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ErrorWithStatus('User not found', 404, 'USER_NOT_FOUND');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ErrorWithStatus('Invalid credentials', 401, 'INVALID_CREDENTIALS');
  }

  const userResponse: UserResponse = {
    id: user._id.toHexString(),
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  const token = generateAccessToken(user._id.toHexString());
  const refreshToken = generateRefreshToken(user._id.toHexString());

  return { token, refreshToken, user: userResponse };
};
