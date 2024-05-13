import express from 'express';
import { eventValidationRules } from '../validations/votingEventValidations';
import { handleAsync, authenticate } from '../utils';
import {
  createEventController,
  getEventController,
  getAllEventsController,
  deleteEventController,
} from '../controllers/votingEventController';

const router = express.Router();

router.post('/create', authenticate, eventValidationRules(), handleAsync(createEventController));
router.get('/:eventId', authenticate, handleAsync(getEventController));
router.get('/all', authenticate, handleAsync(getAllEventsController));
router.delete('/:eventId', authenticate, handleAsync(deleteEventController));
export default router;
