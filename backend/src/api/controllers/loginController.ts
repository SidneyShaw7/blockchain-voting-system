import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { User } from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({
      status: 400,
      message: 'Validation failed, incorrect username or password',
      errorCode: 'VALIDATION_FAILED',
      data: errors.array(),
    });
  }

  try {
    const { username, password } = req.body as IUser;
    const user = await User.findOne({
      $or: [{ username: username }, { email: username }],
    }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next({
        status: 401,
        message: 'Login failed, username or password is incorrect',
        errorCode: 'LOGIN_FAILED',
      });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return next({
        status: 500,
        message: 'JWT secret is not defined. Server unable to process requests requiring authentication.',
        errorCode: 'JWT_CONFIGURATION_ERROR',
      });
    }
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600 * 1000,
      sameSite: 'strict' as const,
    });

    res.json({ message: 'Login successful', token, user: { username: user.username } });
  } catch (error) {
    next({
      status: 500,
      message: 'Internal server error',
      errorCode: 'LOGIN_ERROR',
      data: { detail: error instanceof Error ? error.message : 'Unknown Error' },
    });
  }
};
