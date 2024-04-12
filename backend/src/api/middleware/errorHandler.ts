import { Request, Response, NextFunction } from 'express';
import { logError } from '../utils';
import { ErrorWithStatus } from '../types';

export const errorHandler = (error: ErrorWithStatus, _req: Request, res: Response, _next: NextFunction): void => {
  logError(error);
  res.status(error.status || 500).json({
    error: error.message,
    errorCode: error.errorCode,
    details: error.data,
  });
};

export default errorHandler;
