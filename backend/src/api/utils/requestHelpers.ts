import { Request } from 'express';
import { validationResult } from 'express-validator';
import { ErrorWithStatus } from './custom.errors';

export function handleValidationErrors(req: Request) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ErrorWithStatus('Validation errors', 400, 'VALIDATION_FAILED', errors.array());
  }
}

export function checkUserAuthentication(req: Request) {
  if (!req.user || !req.user._id) {
    throw new ErrorWithStatus('Authentication failure. Please log in.', 500, 'AUTHENTICATION_FAILURE');
  }
}
