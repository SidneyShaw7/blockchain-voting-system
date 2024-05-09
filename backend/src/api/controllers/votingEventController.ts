import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { VotingEventFormValuesDB } from '../types';
import { createVotingEvent, getEventById, getAllEvents, deleteEventById, updateVotingEvent } from '../services';

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

  if (!req.user) {
    console.error('Authentication middleware failed to set req.user');
    return next({
      status: 500,
      message: 'Authentication failure. Please log in.',
      errorCode: 'AUTHENTICATION_FAILURE',
    });
  }

  try {
    const userId = req.user._id.toString();
    const newEvent = await createVotingEvent(req.body as VotingEventFormValuesDB, userId);
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

export const updateEventController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({
      status: 400,
      message: 'Validation errors in your event data',
      errorCode: 'VALIDATION_FAILED',
      data: errors.array(),
    });
  }

  if (!req.user) {
    console.error('Authentication middleware failed to set req.user');
    return next({
      status: 500,
      message: 'Authentication failure. Please log in.',
      errorCode: 'AUTHENTICATION_FAILURE',
    });
  }

  try {
    const eventId = req.params.eventId;
    const userId = req.user._id.toString(); 
    const updatedEvent = await updateVotingEvent(eventId, req.body, userId);

    res.status(200).json({
      message: 'Event updated successfully',
      event: updatedEvent, //  DECIDE LATER what parts of the event to send back
    });
  } catch (error) {
    next({
      status: 500,
      message: 'Internal server error during event update',
      errorCode: 'INTERNAL_ERROR',
      data: { detail: error instanceof Error ? error.message : 'Unknown Error' },
    });
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
    next({
      status: 500,
      message: 'Internal server error',
      errorCode: 'INTERNAL_ERROR',
    });
  }
};

export const getAllEventsController = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const events = await getAllEvents();
    res.json(events);
  } catch (error) {
    next({
      status: 500,
      message: 'Internal server error',
      errorCode: 'INTERNAL_ERROR',
    });
  }
};

export const deleteEventController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deletedEvent = await deleteEventById(req.params.eventId);
    if (!deletedEvent) {
      res.status(404).json({ message: 'Event not found' });
      return;
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
