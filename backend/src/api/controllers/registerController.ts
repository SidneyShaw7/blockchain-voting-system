import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { IUser, User } from '../models/user';

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

  const newUser = new User({
    firstName,
    lastName,
    username,
    email,
    password,
  });

  await newUser.save();

  const userResponse = { firstName, lastName, username, email };
  res.status(201).send({ message: 'User registered successfully', user: userResponse });
};
