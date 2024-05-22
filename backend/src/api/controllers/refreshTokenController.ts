import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user';
import { ErrorWithStatus } from '../utils/custom.errors';

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return next(new ErrorWithStatus('Refresh token is required', 400, 'NO_REFRESH_TOKEN'));
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as any;

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return next(new ErrorWithStatus('Invalid refresh token', 403, 'INVALID_REFRESH_TOKEN'));
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '15m' });
    const newRefreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'strict' as const,
    });

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000, // 15 minutes
      sameSite: 'strict' as const,
    });

    res.json({ accessToken });
  } catch (error) {
    next(new ErrorWithStatus('Invalid refresh token', 403, 'INVALID_REFRESH_TOKEN'));
  }
};
