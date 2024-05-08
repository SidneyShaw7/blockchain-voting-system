import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user';

export const authenticate = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next({
        status: 401,
        message: 'Authentication failed. No token provided.',
        errorCode: 'NO_TOKEN',
        data: { ip: req.ip },
      });
    }

    const secret = process.env.JWT_SECRET as string;
    const decodedToken = jwt.verify(token, secret);

    if (typeof decodedToken === 'object' && 'id' in decodedToken && typeof decodedToken.id === 'string') {
      const user = await UserModel.findById(decodedToken.id);
      if (!user) {
        return next({
          status: 404,
          message: 'User not found',
          errorCode: 'USER_NOT_FOUND',
          data: { userId: decodedToken.id, ip: req.ip },
        });
      }

      req.user = user;
      req.userId = decodedToken.id;

      next();
    } else {
      return next({
        status: 401,
        message: 'Token is invalid',
        errorCode: 'INVALID_TOKEN',
        data: { detail: 'Token does not contain required id.', ip: req.ip },
      });
    }
  } catch (error) {
    next({
      status: 401,
      message: 'Authentication failed. Invalid token.',
      errorCode: 'INVALID_TOKEN',
      data: { detail: error instanceof Error ? error.message : 'Unknown Error', ip: req.ip },
    });
  }
};
