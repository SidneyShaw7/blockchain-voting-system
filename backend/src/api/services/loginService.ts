import { UserModel } from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginCredentials } from '../types';


export const loginUser = async ({
  username,
  password,
}: LoginCredentials): Promise<{ token: string; username: string }> => {
  const user = await UserModel.findOne({
    $or: [{ username: username }, { email: username }],
  }).exec();

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid username or password');
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT secret is not defined. Server unable to process requests requiring authentication.');
  }

  const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
  return {
    username: user.username,
    token,
  };
};
