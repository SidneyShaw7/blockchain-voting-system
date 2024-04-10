import { Request, Response, NextFunction } from 'express';
import logger from './logger';
import { ErrorWithStatus } from '../../types';
import { logError } from '../utils'; 

const errorHandler = (error: ErrorWithStatus, _request: Request, response: Response, _next: NextFunction) => {
  logError(error);

  switch (error.name) {
    case 'CastError':
      response.status(400).json({ error: 'Malformatted ID' });
      break;
    case 'ValidationError':
      response.status(400).json({ error: error.message });
      break;
    case 'JsonWebTokenError':
      response.status(401).json({ error: 'Invalid token' });
      break;
    case 'TokenExpiredError':
      response.status(401).json({ error: 'Token expired' });
      break;
    default:
      logger.error(`Unhandled error: ${error.name}, ${error.message}`);
      response.status(500).json({ error: 'An unexpected error occurred' });
      break;
  }
};

export default errorHandler;
