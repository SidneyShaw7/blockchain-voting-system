import { Request, Response, NextFunction } from 'express';
import logger from '../middleware/logger';
import { ErrorWithStatus } from '../types';

export const errorHandler = (error: ErrorWithStatus, _req: Request, res: Response, _next: NextFunction): void => {
  const isProduction = process.env.NODE_ENV === 'production';

  const statusCode = error.status || 500;
  const message = isProduction ? 'Something went wrong.' : error.message;
  const errorCode = error.errorCode || 'UNSPECIFIED_ERROR';
  const details = isProduction ? {} : error.data;

  logger.error('Error: %s', error.message, {
    errorCode,
    details: error.data,
    stack: error.stack,
  });

  res.status(statusCode).json({
    error: message,
    errorCode,
    details: isProduction ? undefined : details,
  });
};

export default errorHandler;
