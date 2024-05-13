import { UserModel } from '../models/user';
import { VotingEvent } from '../models/votingEvent';
import { VotingEventFormValues, VotingEventFormValuesDB } from '../types';
import mongoose from 'mongoose';
import { startSession } from 'mongoose';
import { ErrorWithStatus } from '../utils';

export const createVotingEvent = async (eventData: VotingEventFormValues, userId: string): Promise<VotingEventFormValuesDB> => {
  const session = await startSession();
  try {
    session.startTransaction();
    const creatorId = new mongoose.Types.ObjectId(userId);

    const newEvent = new VotingEvent({
      ...eventData,
      createdBy: creatorId,
    });
    await newEvent.save({ session });

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $push: { events: newEvent._id },
      },
      { new: true, session }
    );

    if (!updatedUser) {
      throw new ErrorWithStatus('User not found', 404, 'USER_NOT_FOUND');
    }

    await session.commitTransaction();
    return newEvent.toObject() as VotingEventFormValuesDB;
  } catch (error) {
    await session.abortTransaction();
    if (error instanceof Error) {
      throw new ErrorWithStatus(error.message || 'Failed to create event', 500, 'INTERNAL_ERROR');
    } else {
      throw new ErrorWithStatus('Unknown error occurred', 500, 'INTERNAL_ERROR');
    }
  } finally {
    session.endSession();
  }
};

export const updateVotingEvent = async (
  eventId: string,
  eventData: VotingEventFormValues,
  userId: string
): Promise<VotingEventFormValuesDB> => {
  const session = await startSession();
  try {
    session.startTransaction();

    const existingEvent = await VotingEvent.findById(eventId).session(session);
    if (!existingEvent) {
      throw new ErrorWithStatus('Event not found', 404, 'EVENT_NOT_FOUND');
    }
    if (existingEvent.createdBy.toString() !== userId) {
      throw new ErrorWithStatus('User not authorized to update this event', 403, 'NOT_AUTHORIZED');
    }

    const updatedEvent = await VotingEvent.findByIdAndUpdate(eventId, { $set: eventData }, { new: true, session });

    if (!updatedEvent) {
      throw new ErrorWithStatus('Failed to update event', 500, 'UPDATE_FAILED');
    }

    await session.commitTransaction();
    return updatedEvent.toObject() as VotingEventFormValuesDB;
  } catch (error) {
    await session.abortTransaction();
    if (error instanceof Error) {
      throw new ErrorWithStatus(error.message || 'Failed to update event', 500, 'INTERNAL_ERROR');
    } else {
      throw new ErrorWithStatus('Unknown error occurred', 500, 'INTERNAL_ERROR');
    }
  } finally {
    session.endSession();
  }
};

export const getEventById = async (eventId: string): Promise<VotingEventFormValues | null> => {
  if (!eventId) {
    throw new ErrorWithStatus('Event ID is required', 400, 'EVENT_ID_REQUIRED');
  }
  const event = await VotingEvent.findById(eventId);
  if (!event) {
    throw new ErrorWithStatus('Event not found', 404, 'EVENT_NOT_FOUND');
  }
  return event;
};

export const getAllEvents = async (): Promise<VotingEventFormValuesDB[]> => {
  return VotingEvent.find();
};

export const deleteEventById = async (eventId: string): Promise<VotingEventFormValuesDB | null> => {
  const event = await VotingEvent.findByIdAndDelete(eventId);
  if (!event) {
    throw new ErrorWithStatus('Event not found', 404, 'EVENT_NOT_FOUND');
  }
  return event;
};
