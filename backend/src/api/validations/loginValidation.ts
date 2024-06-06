import { ValidationChain, body } from 'express-validator';

export const loginValidationRules = (): ValidationChain[] => [
  body('username')
    .optional()
    .trim()
    .custom((value: string) => {
      const usernameRegex = /^[a-zA-Z0-9_.-]*$/;
      if (!usernameRegex.test(value)) {
        throw new Error('Please enter a valid username');
      }
      return true;
    }),

  body('email').optional().trim().isEmail().withMessage('Please enter a valid email address'),

  body('username').custom((value, { req }) => {
    if (!value && !req.body.email) {
      throw new Error('Username or Email is required');
    }
    return true;
  }),

  body('email').custom((value, { req }) => {
    if (!value && !req.body.username) {
      throw new Error('Username or Email is required');
    }
    return true;
  }),

  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];
