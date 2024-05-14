import { Types, Document } from 'mongoose';
export interface Option extends Document {
  name?: string;
  bio?: string;
  option: string;
  votes: number;
  voters: Types.ObjectId[];
}

export enum StorageType {
  Database = 'Database',
  EthereumMainnet = 'Ethereum Mainnet',
  PrivateNetwork = 'Private Network',
}

export enum EventType {
  Candidate = 'Candidate',
  General = 'General',
}

export interface VotingEventFormValues {
  title: string;
  description: string;
  options: Option[];
  startDate: Date;
  endDate: Date;
  timezone: string;
  // voterEligibility: string;
  votingMethod: string;
  anonymity: boolean;
  resultVisibility: boolean;
  storageType: StorageType;
  eventType: EventType;
  createdBy: Types.ObjectId;
  invitedPersons: Types.ObjectId[];
}

export interface VotingEventFormValuesDB extends VotingEventFormValues, Document {}

export type LeanDocument<T> = Omit<T, keyof Document>;

export type LeanVotingEvent = LeanDocument<VotingEventFormValuesDB>;
