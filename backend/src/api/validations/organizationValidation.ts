import { ValidationChain, body } from 'express-validator';

export const organizationValidationRules = (): ValidationChain[] => [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Organization name must be between 2 and 50 characters'),
  body('location').trim().isLength({ min: 2, max: 100 }).withMessage('Location must be between 2 and 100 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
  body('billingInfo').trim().isLength({ min: 2, max: 100 }).withMessage('Billing info must be between 2 and 100 characters'),
  body('billingEmail').normalizeEmail().isEmail().withMessage('Must be a valid email'),
];
