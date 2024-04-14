import { ValidationChain, body } from 'express-validator';

export const loginValidationRules = (): ValidationChain[] => [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username or Email is required')
    .custom((value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const usernameRegex = /^[a-zA-Z0-9_.-]*$/;

      if (emailRegex.test(value) || usernameRegex.test(value)) {
        return true;
      } else {
        throw new Error('Please enter a valid username or email');
      }
    }),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];
