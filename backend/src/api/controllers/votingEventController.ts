import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
// import { VotingEvent } from '../models/votingEvent';
import { VotingEventFormValuesDB } from '../types';
import { createVotingEvent, getEventById, getAllEvents, deleteEventById } from '../services';

export const createEventController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({
      status: 400,
      message: 'Validation errors in your event data',
      errorCode: 'VALIDATION_FAILED',
      data: errors.array(),
    });
  }

  try {
    const newEvent = await createVotingEvent(req.body as VotingEventFormValuesDB);
    res.status(201).send({
      message: 'Event created successfully',
      event: {
        title: newEvent.title,
        description: newEvent.description,
        startDate: newEvent.startDate,
        endDate: newEvent.endDate,
        eventType: newEvent.eventType,
      },
    });
  } catch (error) {
    next({
      status: 500,
      message: 'Internal server error during event creation',
      errorCode: 'INTERNAL_ERROR',
      data: { detail: error instanceof Error ? error.message : 'Unknown Error' },
    });
  }
};

export const getEventController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await getEventById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    next({
      status: 500,
      message: 'Internal server error',
      errorCode: 'INTERNAL_ERROR',
    });
  }
};

export const getAllEventsController = async (_req: Request, res: Response) => {
  const events = await getAllEvents();
  res.json(events);
};

export const deleteEventController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedEvent = await deleteEventById(req.params.eventId);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    next({
      status: 500,
      message: 'Internal server error',
      errorCode: 'INTERNAL_ERROR',
    });
  }
};
