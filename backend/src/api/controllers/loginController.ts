import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { LoginCredentials } from '../types';
import { loginUser } from '../services';

export const loginUserController = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({
      status: 400,
      message: 'Validation failed, incorrect username or password',
      errorCode: 'VALIDATION_FAILED',
      data: errors.array(),
    });
  }
  const credentials = req.body as LoginCredentials;

  try {
    const { token, username } = await loginUser(credentials);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600 * 1000,
      sameSite: 'strict' as const,
    });

    res.json({ message: 'Login successful', token, user: { username } });
  } catch (error) {
    next({
      status: 500,
      message: 'Internal server error',
      errorCode: 'LOGIN_ERROR',
      data: { detail: error instanceof Error ? error.message : 'Unknown Error' },
    });
  }
};

export const logoutUserController = async (_req: Request, res: Response) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
  });

  res.status(200).json({ message: 'Logged out successfully' });
};
