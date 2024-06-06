import { ValidationChain, body } from 'express-validator';

export const updateUserValidationRules = (): ValidationChain[] => [
  body('firstName').trim().isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),
  body('lastName').trim().isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').normalizeEmail().isEmail().withMessage('Must be a valid email'),
  body('password').notEmpty().withMessage('Current Password is required'),
  body('newPassword')
    .optional()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      'New Password must be at least 8 characters long and include at least one number, one uppercase letter, and one special character'
    ),
];
