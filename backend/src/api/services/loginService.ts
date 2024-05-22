import { UserModel } from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginCredentials, UserResponse } from '../types';
import { ErrorWithStatus } from '../utils/custom.errors';

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

  const secret = process.env.JWT_SECRET;
  const refreshSecret = process.env.JWT_REFRESH_SECRET!;

  if (!secret || !refreshSecret) {
    throw new ErrorWithStatus(
      'JWT secret is not defined. Server unable to process requests requiring authentication.',
      500,
      'SERVER_CONFIGURATION_ERROR'
    );
  }

  const userResponse: UserResponse = {
    id: user._id.toHexString(),
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
  const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ id: user._id }, refreshSecret, { expiresIn: '7d' });

  return { token, refreshToken, user: userResponse };
};
