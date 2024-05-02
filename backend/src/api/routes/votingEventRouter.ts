import express from 'express';
import { authenticate } from '../middleware';
import { createEvent } from '../controllers/votingEventController';
import { eventValidationRules } from '../validations/votingEventValidations';

const router = express.Router();

router.post('/events', authenticate, eventValidationRules(), createEvent);

export default router;
