import { body, ValidationChain } from 'express-validator';

// Define a function that returns an array of ValidationChain objects.
// This explicitly states that the return type is an array of ValidationChain,
// which helps with type safety and code clarity.
export const userValidationRules = (): ValidationChain[] => [
  body('firstName').trim().isLength({ min: 1 }).withMessage('First name is required'),

  body('lastName').trim().isLength({ min: 1 }).withMessage('Last name is required'),

  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),

  body('email').normalizeEmail().isEmail().withMessage('Must be a valid email'),

  body('password')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character and be at least 8 characters long'
    ),
];
