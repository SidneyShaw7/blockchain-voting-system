import { Request, Response, NextFunction } from 'express';
import logger from './logger';
import { ErrorWithStatus } from '../types';

export const errorMiddleware = (error: ErrorWithStatus, _req: Request, res: Response, _next: NextFunction): void => {
  const statusCode = error.status || 500;
  const isProduction = process.env.NODE_ENV === 'production';
  const responseMessage = isProduction ? 'Something went wrong.' : error.message;

  logger.error('Error occurred', {
    statusCode,
    message: error.message,
    errorCode: error.errorCode,
    details: error.data,
    stack: isProduction ? undefined : error.stack,
  });

  res.status(statusCode).json({
    error: responseMessage,
    errorCode: error.errorCode || 'UNSPECIFIED_ERROR',
    details: isProduction ? undefined : error.data,
  });
};

export default errorMiddleware;
