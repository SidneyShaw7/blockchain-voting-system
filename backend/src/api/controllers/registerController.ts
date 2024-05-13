import { Request, Response, NextFunction } from 'express';
import { UserRegistration } from '../types';
import { registerUser } from '../services';
import { ErrorWithStatus, handleValidationErrors } from '../utils';

export const registerUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  handleValidationErrors(req);

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
    next(
      new ErrorWithStatus('Failed to register user', 500, 'REGISTRATION_ERROR', {
        detail: error instanceof Error ? error.message : 'Unknown error',
        input: { firstName, lastName, username, email },
      })
    );
  }
};
