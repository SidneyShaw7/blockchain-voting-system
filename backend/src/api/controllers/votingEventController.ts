import { Request, Response, NextFunction } from 'express';
import { VotingEventFormValuesDB } from '../types';
import { createVotingEvent, getEventById, getAllEvents, deleteEventById, updateVotingEvent } from '../services';
import { ErrorWithStatus, handleValidationErrors, checkUserAuthentication, handleError } from '../utils';

export const createEventController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  handleValidationErrors(req);
  checkUserAuthentication(req);

  try {
    const userId = req.user._id.toString();
    const newEvent = await createVotingEvent(req.body as VotingEventFormValuesDB, userId);
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
  } catch (error) {
    throw next(handleError(error));
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
    throw next(handleError(error));
  }
};

export const getEventController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const event = await getEventById(req.params.eventId);
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.json(event);
  } catch (error) {
    throw next(handleError(error));
  }
};

export const getAllEventsController = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const events = await getAllEvents();
    res.json(events);
  } catch (error) {
    throw next(handleError(error));
  }
};

export const deleteEventController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deletedEvent = await deleteEventById(req.params.eventId);
    if (!deletedEvent) {
      throw new ErrorWithStatus('Event not found', 404, 'EVENT_NOT_FOUND');
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    throw next(handleError(error));
  }
};
