import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user';
import { ErrorWithStatus } from '../utils';

export const authenticate = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next(new ErrorWithStatus('Authentication failed. No token provided.', 401, 'NO_TOKEN', { ip: req.ip }));
    }

    const secret = process.env.JWT_SECRET as string;
    const decodedToken = jwt.verify(token, secret);

    if (typeof decodedToken === 'object' && 'id' in decodedToken && typeof decodedToken.id === 'string') {
      const user = await UserModel.findById(decodedToken.id);
      if (!user) {
        return next(new ErrorWithStatus('User not found', 404, 'USER_NOT_FOUND', { userId: decodedToken.id, ip: req.ip }));
      }

      req.user = user;
      req.userId = decodedToken.id;

      next();
    } else {
      return next(
        new ErrorWithStatus('Token is invalid', 401, 'INVALID_TOKEN', {
          detail: 'Token does not contain required id.',
          ip: req.ip,
        })
      );
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(
        new ErrorWithStatus('Authentication failed. Invalid token.', 401, 'INVALID_TOKEN', { detail: error.message, ip: req.ip })
      );
    } else {
      return next(
        new ErrorWithStatus('Authentication failed.', 401, 'AUTH_ERROR', {
          detail: 'Unknown error during authentication',
          ip: req.ip,
        })
      );
    }
  }
};
