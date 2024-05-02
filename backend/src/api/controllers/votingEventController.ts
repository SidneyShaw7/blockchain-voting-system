import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { VotingEvent } from '../models/votingEvent';
// import { VotingEventFormValues } from '../models/votingEvent'; 

export const createEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({
      status: 400,
      message: 'Validation errors in your event data',
      errorCode: 'VALIDATION_FAILED',
      data: errors.array(),
    });
  }

  const {
    title,
    description,
    options,
    startDate,
    endDate,
    timezone,
    voterEligibility,
    votingMethod,
    anonymity,
    resultVisibility,
    storageType,
    eventType,
    createdBy,
  } = req.body;

  try {
    const newEvent = new VotingEvent({
      title,
      description,
      options,
      startDate,
      endDate,
      timezone,
      voterEligibility,
      votingMethod,
      anonymity,
      resultVisibility,
      storageType,
      eventType,
      createdBy,
    });

    await newEvent.save();

    res.status(201).send({
      message: 'Event created successfully',
      event: {
        title,
        description,
        startDate,
        endDate,
        eventType,
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
