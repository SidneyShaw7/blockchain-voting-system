import { Request, Response, NextFunction } from 'express';
import { UserResponse, UserProfileValues } from '../types';
import { updateUser, getUsers } from '../services';
import { ErrorWithStatus, handleValidationErrors } from '../utils';

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
  handleValidationErrors(req);

  const userId = req.user.id;
  console.log('User id:', userId);

  const { firstName, lastName, username, email, password, newPassword } = req.body;
  const avatar = req.file?.path;

  const updatedData: UserProfileValues = {
    firstName,
    lastName,
    username,
    email,
    password,
    newPassword,
    avatar,
  };

  try {
    const updatedUser = await updateUser(userId, updatedData);

    const userResponse: UserResponse = {
      id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      username: updatedUser.username,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      events: updatedUser.events?.map((event) => event),
    };

    res.json(userResponse);
  } catch (error) {
    next(
      new ErrorWithStatus('Profile update failed', 500, 'PROFILE_UPDATE_ERROR', {
        detail: error instanceof Error ? error.message : 'Unknown profile update error',
      })
    );
  }
};

export const getUsersController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userIds = req.body.userIds;
    const users = await getUsers(userIds);
    res.json(users);
  } catch (error) {
    next(error);
  }
};
