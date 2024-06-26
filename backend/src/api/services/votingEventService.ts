import { UserModel } from '../models/user';
import { VotingEvent } from '../models/votingEvent';
import { VotingEventFormValues, VotingEventFormValuesDB, LeanVotingEvent } from '../types';
import mongoose from 'mongoose';
import { startSession, Types } from 'mongoose';
import { ErrorWithStatus } from '../utils';

export const createVotingEvent = async (eventData: VotingEventFormValues, userId: string): Promise<VotingEventFormValuesDB> => {
  const session = await startSession();
  session.startTransaction();
  try {
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
    throw new ErrorWithStatus(error instanceof Error ? error.message : 'Failed to update event', 500, 'INTERNAL_ERROR');
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
    throw new ErrorWithStatus(error instanceof Error ? error.message : 'Failed to update event', 500, 'INTERNAL_ERROR', {
      detail: error instanceof Error ? error.message : 'Unknown error',
    });
  } finally {
    session.endSession();
  }
};

export const getEventById = async (eventId: string): Promise<LeanVotingEvent> => {
  if (!eventId) {
    throw new ErrorWithStatus('Event ID is required', 400, 'EVENT_ID_REQUIRED');
  }
  const event = await VotingEvent.findById(eventId).lean<LeanVotingEvent>({ virtuals: true });
  if (!event) {
    throw new ErrorWithStatus('Event not found', 404, 'EVENT_NOT_FOUND');
  }

  return event;
};

export const getAllEvents = async (userId: string): Promise<LeanVotingEvent[]> => {
  return VotingEvent.find({
    $or: [{ createdBy: userId }, { invitedPersons: userId }],
  }).lean<LeanVotingEvent[]>({ virtuals: true });
};

export const deleteEventById = async (eventId: string): Promise<LeanVotingEvent | null> => {
  const event = await VotingEvent.findByIdAndDelete(eventId).lean<LeanVotingEvent>({ virtuals: true });
  if (!event) {
    throw new ErrorWithStatus('Event not found', 404, 'EVENT_NOT_FOUND');
  }
  return event;
};

export const voteOnEvent = async (eventId: string, optionId: string, userId: string): Promise<void> => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const event = await VotingEvent.findById(eventId).session(session);
    if (!event) {
      throw new ErrorWithStatus('Event not found', 404, 'EVENT_NOT_FOUND');
    }

    const option = event.options.id(optionId);
    if (!option) {
      throw new ErrorWithStatus('Option not found', 404, 'OPTION_NOT_FOUND');
    }

    const voterObjectId = new Types.ObjectId(userId);
    if (option.voters.includes(voterObjectId)) {
      throw new ErrorWithStatus('User has already voted', 403, 'ALREADY_VOTED');
    }

    option.votes += 1;
    option.voters.push(voterObjectId);

    await event.save({ session });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw new ErrorWithStatus('Failed to vote on event', 500, 'VOTE_FAILED', {
      detail: error instanceof Error ? error.message : 'Unknown error',
    });
  } finally {
    session.endSession();
  }
};

export const inviteUserToEvent = async (eventId: string, email: string): Promise<void> => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ErrorWithStatus('User not found', 404, 'USER_NOT_FOUND');
  }

  const event = await VotingEvent.findById(eventId);
  if (!event) {
    throw new ErrorWithStatus('Event not found', 404, 'EVENT_NOT_FOUND');
  }

  if (event.invitedPersons.includes(user._id)) {
    throw new ErrorWithStatus('User already invited', 400, 'USER_ALREADY_INVITED');
  }

  event.invitedPersons.push(user._id);
  await event.save();
};

export const removeUserFromEvent = async (eventId: string, userId: string): Promise<void> => {
  const event = await VotingEvent.findById(eventId);
  if (!event) {
    throw new ErrorWithStatus('Event not found', 404, 'EVENT_NOT_FOUND');
  }

  const userObjectId = new mongoose.Types.ObjectId(userId);
  const userIndex = event.invitedPersons.indexOf(userObjectId);
  if (userIndex === -1) {
    throw new ErrorWithStatus('User not found in event', 404, 'USER_NOT_FOUND_IN_EVENT');
  }

  event.invitedPersons.splice(userIndex, 1);
  await event.save();
};
