import { Types, Document } from 'mongoose';
export interface Option extends Document {
  name?: string;
  bio?: string;
  option?: string;
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
}

// Database document interface tailored to match db model
export interface VotingEventFormValuesDB extends Document {
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
}
