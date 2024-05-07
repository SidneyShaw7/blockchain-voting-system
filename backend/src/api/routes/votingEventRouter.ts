import express from 'express';
import { authenticate } from '../middleware';
import { eventValidationRules } from '../validations/votingEventValidations';
import { asyncHandler } from '../middleware';
import {
  createEventController,
  getEventController,
  getAllEventsController,
  deleteEventController,
} from '../controllers/votingEventController';

const router = express.Router();

router.post('/create', authenticate, eventValidationRules(), asyncHandler(createEventController));
router.get('/:eventId', authenticate, asyncHandler(getEventController));
router.get('/all', authenticate, asyncHandler(getAllEventsController));
router.delete('/:eventId', authenticate, asyncHandler(deleteEventController));
export default router;
