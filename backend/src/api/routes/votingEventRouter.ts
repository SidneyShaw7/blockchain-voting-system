import express from 'express';
import { eventValidationRules } from '../validations/votingEventValidation';
import { handleAsync, authenticate } from '../utils';
import {
  createEventController,
  getEventController,
  getAllEventsController,
  deleteEventController,
  voteOnEventController,
  updateEventController,
  inviteUserController,
  deleteUserController,
} from '../controllers/votingEventController';

const router = express.Router();

router.post('/create', authenticate, eventValidationRules(), handleAsync(createEventController));
router.get('/:eventId', authenticate, handleAsync(getEventController));
router.get('/', authenticate, handleAsync(getAllEventsController));
router.delete('/:eventId', authenticate, handleAsync(deleteEventController));
router.post('/:eventId/vote/:optionId', authenticate, handleAsync(voteOnEventController));
router.put('/:eventId/update', authenticate, eventValidationRules(), handleAsync(updateEventController));
router.post('/:eventId/invite', authenticate, handleAsync(inviteUserController));
router.delete('/:eventId/users/:userId', authenticate, handleAsync(deleteUserController));

export default router;
