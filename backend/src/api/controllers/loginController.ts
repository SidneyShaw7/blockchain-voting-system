import { Request, Response, NextFunction } from 'express';
import { LoginCredentials, UserResponse } from '../types';
import { loginUser } from '../services';
import { ErrorWithStatus, handleValidationErrors } from '../utils';

export const loginUserController = async (req: Request, res: Response, next: NextFunction) => {
  handleValidationErrors(req);

  const credentials = req.body as LoginCredentials;

  try {
    const { token, refreshToken, user } = await loginUser(credentials);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'strict' as const,
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600 * 1000,
      sameSite: 'strict' as const,
    });

    const userResponse: UserResponse = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      events: user.events?.map((event) => event),
    };

    res.json({ message: 'Login successful', token, user: userResponse });
  } catch (error) {
    next(
      new ErrorWithStatus('Login failed', 500, 'LOGIN_ERROR', {
        detail: error instanceof Error ? error.message : 'Unknown login error',
      })
    );
  }
};

export const logoutUserController = async (_req: Request, res: Response) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
  });

  res.cookie('refreshToken', '', {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
  });

  res.status(200).json({ message: 'Logged out successfully' });
};
