import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { IUser, User } from '../models/user';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({
      status: 400,
      message: 'Validation errors',
      errorCode: 'VALIDATION_FAILED',
      data: errors.array(),
    });
  }

  const { firstName, lastName, username, email, password } = req.body as IUser;

  try {
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h', 
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 3600 * 1000,
      sameSite: 'strict' as const,
    });

    const userResponse = { firstName, lastName, username, email };
    res.status(201).send({ message: 'User registered successfully', user: userResponse });
    
  } catch (error) {
    next({
      status: 500,
      message: 'Internal server error',
      errorCode: 'INTERNAL_ERROR',
      data: { detail: error instanceof Error ? error.message : 'Unknown Error' },
    });
  }
};
