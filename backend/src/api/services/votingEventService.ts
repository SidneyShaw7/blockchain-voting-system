import { UserModel } from '../models/user';
import { VotingEvent } from '../models/votingEvent';
import { VotingEventFormValues, VotingEventFormValuesDB } from '../types';
import mongoose from 'mongoose';
import { startSession } from 'mongoose';
import { ErrorWithStatus } from '../utils/custom.errors';

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

export const getEventById = async (eventId: string): Promise<VotingEventFormValues | null> => {
  return VotingEvent.findById(eventId);
};

export const getAllEvents = async (): Promise<VotingEventFormValuesDB[]> => {
  return VotingEvent.find();
};

export const deleteEventById = async (eventId: string): Promise<VotingEventFormValuesDB | null> => {
  return VotingEvent.findByIdAndDelete(eventId);
};
