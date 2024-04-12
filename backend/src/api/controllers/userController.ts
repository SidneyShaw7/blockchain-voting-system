import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { IUser, User } from '../models/user';
import logger from '../middleware/logger';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
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
    // Ensuring sensitive info like passwords are not sent back in the response
    const userResponse = { firstName, lastName, username, email }; // Construct response object manually
    res.status(201).send({ message: 'User registered successfully', user: userResponse });
  } catch (error: unknown) {
    // Handling the unknown type for caught errors
    // Safely assert error as an instance of Error to access its properties
    if (error instanceof Error) {
      logger.error('Registration error:', { error: error.message });
      res.status(400).json({ message: 'Registration failed', details: error.message });
    } else {
      // Handling cases where the error might not be an instance of Error
      logger.error('Registration error: Unknown error');
      res.status(400).json({ message: 'Registration failed due to an unknown error' });
    }
  }
};
