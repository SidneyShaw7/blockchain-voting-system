import { Types } from 'mongoose'; 
export interface Option {
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
  voterEligibility: string;
  votingMethod: string;
  anonymity: boolean;
  resultVisibility: boolean;
  storageType: StorageType;
  eventType: EventType;
  createdBy: Types.ObjectId;
}
