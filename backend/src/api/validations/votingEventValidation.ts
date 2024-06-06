import { ValidationChain, body } from 'express-validator';

export const eventValidationRules = (): ValidationChain[] => [
  body('title').trim().isLength({ min: 5, max: 100 }).withMessage('Title must be between 5 and 100 characters'),
  body('description').trim().isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters'),
  body('options.*.name').optional().trim().isLength({ max: 100 }).withMessage('Option name must be under 100 characters'),
  body('options.*.bio').optional().trim().isLength({ max: 500 }).withMessage('Option bio must be under 500 characters'),
  body('options.*.option').trim().isLength({ min: 1 }).withMessage('Option value must not be empty'),
  body('startDate').isISO8601().withMessage('Start date must be a valid date'),
  body('endDate')
    .isISO8601()
    .withMessage('End date must be a valid date')
    .custom((value, { req }) => new Date(value) > new Date(req.body.startDate))
    .withMessage('End date must be after start date'),
  body('timezone').trim().isLength({ min: 1 }).withMessage('Timezone must not be empty'),
  // body('voterEligibility').trim().isLength({ min: 1 }).withMessage('Voter eligibility must not be empty'),
  body('votingMethod').trim().isLength({ min: 1 }).withMessage('Voting method must not be empty'),
  body('anonymity').isBoolean(),
  body('resultVisibility').isBoolean(),
  body('storageType').isIn(['Database', 'Ethereum Mainnet', 'Private Network']).withMessage('Invalid storage type'),
  body('eventType').isIn(['Candidate', 'General']).withMessage('Invalid event type'),
];
