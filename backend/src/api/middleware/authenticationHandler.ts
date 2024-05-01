import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
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
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === 'object' && 'id' in decoded) {
      req.userId = decoded.id;
      next();
    } else {
      next({
        status: 401,
        message: 'Invalid token format.',
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
