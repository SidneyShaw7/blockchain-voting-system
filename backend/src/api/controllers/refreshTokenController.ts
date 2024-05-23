import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { UserModel } from '../models/user';
import { ErrorWithStatus } from '../utils/custom.errors';
import { verifyRefreshToken, generateAccessToken } from '../services/tokenService';

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return next(new ErrorWithStatus('Refresh token is required', 401, 'NO_REFRESH_TOKEN'));
    }

    const decoded = verifyRefreshToken(refreshToken);

    if (typeof decoded !== 'object' || !('id' in decoded) || typeof decoded.id !== 'string') {
      throw new ErrorWithStatus('Invalid refresh token', 401, 'INVALID_REFRESH_TOKEN');
    }

    const newAccessToken = generateAccessToken(decoded.id);

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600 * 1000, // 1 hour
      sameSite: 'strict' as const,
    });

    res.json({ message: 'Token refreshed successfully' });
  } catch (error) {
    next(new ErrorWithStatus('Invalid refresh token', 403, 'INVALID_REFRESH_TOKEN'));
  }
};
