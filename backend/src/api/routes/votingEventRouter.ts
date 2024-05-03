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

router.post('/events', authenticate, eventValidationRules(), asyncHandler(createEventController));
router.get('/events/:eventId', authenticate, asyncHandler(getEventController));
router.get('/events', authenticate, asyncHandler(getAllEventsController));
router.delete('/events/:eventId', authenticate, asyncHandler(deleteEventController));
export default router;
