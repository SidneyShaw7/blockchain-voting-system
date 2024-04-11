import { Request, Response } from 'express';
import { User } from '../models/user';
import logger from '../middleware/logger';
import { IUser } from '../models/user';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password,
    });
    await newUser.save();
    res.status(201).send({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    logger.error('Registration error:', { error });
    res.status(400).json({ error: 'Registration failed', message: error.message });
  }
};
