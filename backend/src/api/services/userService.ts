import { UserModel } from '../models/user';
import { UserProfileValues, UserResponse, SimpleUser } from '../types';
import bcrypt from 'bcryptjs';
import { ErrorWithStatus } from '../utils';
import { Types } from 'mongoose';

export const updateUser = async (userId: string, formData: UserProfileValues): Promise<UserResponse> => {
  const { firstName, lastName, username, email, password, newPassword, avatar } = formData;

  const user = await UserModel.findById(userId);
  if (!user) {
    throw new ErrorWithStatus('User not found', 404, 'USER_NOT_FOUND');
  }

  console.log(`Current password from formData: ${password}`);
  console.log(`Stored hashed password: ${user.password}`);

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
    console.log(`New hashed password: ${user.password}`);
  }

  if (avatar) {
    user.avatar = avatar;
  }

  await user.save();
  console.log('User saved successfully with updated password');

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

export const getUsers = async (userIds: string[]): Promise<SimpleUser[]> => {
  try {
    const validUserIds = userIds.map((id) => {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error(`Invalid ObjectId: ${id}`);
      }
      return new Types.ObjectId(id);
    });

    const users = await UserModel.find({ _id: { $in: validUserIds } })
      .select('firstName lastName email')
      .lean<{ _id: Types.ObjectId; firstName: string; lastName: string; email: string }[]>();

    return users.map((user) => ({
      id: user._id.toHexString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};
