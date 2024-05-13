import { ErrorWithStatus } from './custom.errors';

export const handleError = (error: unknown): ErrorWithStatus => {
  if (error instanceof Error) {
    return new ErrorWithStatus(error.message, 500, 'INTERNAL_ERROR');
  }
  return new ErrorWithStatus('Unknown error occurred', 500, 'INTERNAL_ERROR');
};