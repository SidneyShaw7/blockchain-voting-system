import { VotingEvent } from '../models/votingEvent';
import { VotingEventFormValues, VotingEventFormValuesDB } from '../types';

export const createVotingEvent = async (eventData: VotingEventFormValues): Promise<VotingEventFormValuesDB> => {
  const newEvent = new VotingEvent(eventData);
  await newEvent.save();
  return newEvent;
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
