import { Request, Response, NextFunction } from 'express';
import {
  createVotingEvent,
  getEventById,
  getAllEvents,
  deleteEventById,
  updateVotingEvent,
  voteOnEvent,
  inviteUserToEvent,
  removeUserFromEvent,
} from '../services';
import { ErrorWithStatus, handleValidationErrors, checkUserAuthentication } from '../utils';

export const createEventController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  handleValidationErrors(req);
  checkUserAuthentication(req);

  try {
    const userId = req.user._id.toString();
    const newEvent = await createVotingEvent(req.body, userId);
    res.status(201).send({
      message: 'Event created successfully',
      event: {
        id: newEvent._id,
        title: newEvent.title,
        description: newEvent.description,
        startDate: newEvent.startDate,
        endDate: newEvent.endDate,
        eventType: newEvent.eventType,
      },
    });
    console.log(res);
  } catch (error) {
    next(
      new ErrorWithStatus('Failed to create event', 500, 'EVENT_CREATION_FAILED', {
        detail: error instanceof Error ? error.message : 'Unknown error',
      })
    );
  }
};

export const updateEventController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  handleValidationErrors(req);
  checkUserAuthentication(req);

  try {
    const eventId = req.params.eventId;
    const userId = req.user._id.toString();
    const updatedEvent = await updateVotingEvent(eventId, req.body, userId);

    res.status(200).json({
      message: 'Event updated successfully',
      event: updatedEvent, //  DECIDE LATER what parts of the event to send back
    });
  } catch (error) {
    next(
      new ErrorWithStatus('Failed to update event', 500, 'EVENT_UPDATE_FAILED', {
        detail: error instanceof Error ? error.message : 'Unknown error',
      })
    );
  }
};

export const getEventController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const eventId = req.params.eventId;
    // const userId = req.user._id.toString();
    const event = await getEventById(eventId);
    if (!event) {
      throw new ErrorWithStatus('Event not found', 404, 'EVENT_NOT_FOUND');
    }
    res.json(event);
  } catch (error) {
    next(
      new ErrorWithStatus('Failed to fetch event', 500, 'EVENT_FETCH_FAILED', {
        detail: error instanceof Error ? error.message : 'Unknown error',
      })
    );
  }
};

export const getAllEventsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user._id.toString();
    const events = await getAllEvents(userId);
    res.json(events);
  } catch (error) {
    next(
      new ErrorWithStatus('Failed to fetch all events', 500, 'EVENTS_FETCH_FAILED', {
        detail: error instanceof Error ? error.message : 'Unknown error',
      })
    );
  }
};

export const deleteEventController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deletedEvent = await deleteEventById(req.params.eventId);
    res.status(200).json({ message: 'Event deleted successfully', deletedEvent });
  } catch (error) {
    next(
      new ErrorWithStatus('Failed to delete event', 500, 'EVENT_DELETION_FAILED', {
        detail: error instanceof Error ? error.message : 'Unknown error',
      })
    );
  }
};

export const voteOnEventController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  handleValidationErrors(req);
  checkUserAuthentication(req);

  try {
    const { eventId, optionId } = req.params;
    const userId = req.user._id.toString();

    await voteOnEvent(eventId, optionId, userId);

    res.status(200).json({ message: 'Vote recorded successfully' });
  } catch (error) {
    next(
      new ErrorWithStatus('Failed to vote on event', 500, 'VOTE_FAILED', {
        detail: error instanceof Error ? error.message : 'Unknown error',
      })
    );
  }
};

export const inviteUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  handleValidationErrors(req);
  checkUserAuthentication(req);

  try {
    const { eventId } = req.params;
    const { email } = req.body;
    await inviteUserToEvent(eventId, email);
    res.status(200).json({ message: 'User invited successfully' });
  } catch (error) {
    next(
      new ErrorWithStatus('Failed to invite user', 500, 'INVITE_USER_FAILED', {
        detail: error instanceof Error ? error.message : 'Unknown error',
      })
    );
  }
};

export const deleteUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { eventId, userId } = req.params;
    await removeUserFromEvent(eventId, userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(
      new ErrorWithStatus('Failed to delete user from event', 500, 'DELETE_USER_FAILED', {
        detail: error instanceof Error ? error.message : 'Unknown error',
      })
    );
  }
};
