import { Request, Response, NextFunction } from 'express';
import { logger } from '../middleware'; 
import { ErrorWithStatus } from '../types';

export const errorHandler = (error: ErrorWithStatus, _req: Request, res: Response, _next: NextFunction): void => {
  logger.error('Error: %s', error.message, {
    errorCode: error.errorCode,
    details: error.data,
    stack: error.stack,
  });

  res.status(error.status || 500).json({
    error: error.message,
    errorCode: error.errorCode,
    details: error.data,
  });
};

export default errorHandler;
