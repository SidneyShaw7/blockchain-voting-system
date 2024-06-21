import { z } from 'zod';
import { StorageType, EventType } from '../../types/event.types';

const OptionSchema = z.object({
  name: z.string().optional(),
  bio: z.string().optional(),
  option: z.string().min(1, 'Option value must not be empty'),
});

export const EventSchema = z.object({
  title: z.string().min(5, 'Event title is required and should be at least 5 characters'),
  description: z.string().min(10, 'Description is required and should be at least 10 characters'),
  options: z.array(OptionSchema),
  startDate: z.date(),
  endDate: z.date(),
  timezone: z.string().min(1, 'Timezone is required'),
  votingMethod: z.string().min(1, 'Voting method is required'),
  anonymity: z.boolean(),
  resultVisibility: z.boolean(),
  storageType: z.nativeEnum(StorageType),
  eventType: z.nativeEnum(EventType),
});

export type ZodVotingEventFormValues = z.infer<typeof EventSchema>;
