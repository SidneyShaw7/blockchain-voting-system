import { z } from 'zod';
import { StorageType, EventType } from '../../types/event.types';

const OptionSchema = z.object({
  name: z.string().optional(),
  bio: z.string().optional(),
  option: z.string().optional(),
});

export const EventSchema = z.object({
  title: z.string().min(1, 'Event title is required'),
  description: z.string().min(1, 'Description is required'),
  options: z.array(OptionSchema),
  startDate: z.date(),
  endDate: z.date(),
  timezone: z.string().min(1, 'Timezone is required'),
  // voterEligibility: z.string().min(1, 'Voter eligibility is required'),
  votingMethod: z.string().min(1, 'Voting method is required'),
  anonymity: z.boolean(),
  resultVisibility: z.boolean(),
  storageType: z.nativeEnum(StorageType),
  eventType: z.nativeEnum(EventType),
});

export type ZodVotingEventFormValues = z.infer<typeof EventSchema>;
