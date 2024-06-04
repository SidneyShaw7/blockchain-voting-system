import { UserModel } from '../models/user';
import { UserProfileValues, UserResponse } from '../types';
import bcrypt from 'bcryptjs';
import { ErrorWithStatus } from '../utils';

export const updateUser = async (userId: string, formData: UserProfileValues): Promise<UserResponse> => {
  const { firstName, lastName, username, email, password, newPassword, avatar } = formData;

  const user = await UserModel.findById(userId);
  if (!user) {
    throw new ErrorWithStatus('User not found', 404, 'USER_NOT_FOUND');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ErrorWithStatus('Invalid current password', 401, 'INVALID_PASSWORD');
  }

  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.username = username || user.username;
  user.email = email || user.email;

  if (newPassword) {
    user.password = await bcrypt.hash(newPassword, 12);
  }

  if (avatar) {
    user.avatar = avatar;
  }

  await user.save();

  const userResponse: UserResponse = {
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    avatar: user.avatar ? `data:image/png;base64,${user.avatar.toString('base64')}` : undefined,
  };

  return userResponse;
};
