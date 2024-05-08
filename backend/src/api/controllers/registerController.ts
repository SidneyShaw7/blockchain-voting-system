import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { UserRegistration } from '../types';
import { registerUser } from '../services';

export const registerUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({
      status: 400,
      message: 'Validation errors',
      errorCode: 'VALIDATION_FAILED',
      data: errors.array(),
    });
  }

  const { firstName, lastName, username, email, password } = req.body as UserRegistration;

  try {
    const { user, token } = await registerUser({ firstName, lastName, username, email, password });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600 * 1000,
      sameSite: 'strict' as const,
    });

    res.status(201).send({ message: 'User registered successfully', user });
  } catch (error) {
    next({
      status: 500,
      message: 'Internal server error',
      errorCode: 'INTERNAL_ERROR',
      data: { detail: error instanceof Error ? error.message : 'Unknown Error' },
    });
  }
};
