import { UserModel } from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginCredentials } from '../types';
import { ErrorWithStatus } from '../utils/custom.errors';

export const loginUser = async ({ username, password }: LoginCredentials): Promise<{ token: string; username: string }> => {
  const user = await UserModel.findOne({
    $or: [{ username: username }, { email: username }],
  }).exec();

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ErrorWithStatus('Invalid username or password', 401, 'AUTHENTICATION_ERROR');
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new ErrorWithStatus(
      'JWT secret is not defined. Server unable to process requests requiring authentication.',
      500,
      'SERVER_CONFIGURATION_ERROR'
    );
  }

  const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
  return {
    username: user.username,
    token,
  };
};
