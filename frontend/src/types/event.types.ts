export interface Option {
  name?: string;
  bio?: string;
  option: string;
  votes: number;
  voters: string[];
}

export interface OptionDB extends Option {
  id: string;
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
  createdBy: string;
  invitedPersons: string[];
}

export interface VotingEventFormValuesDB extends VotingEventFormValues {
  id: string;
  options: OptionDB[];
}

//  prop types for the helper components

export interface BaseFieldProps {
  name: string;
  label: string;
}

export interface InputFieldProps extends BaseFieldProps {
  inputType?: 'input' | 'textarea';
}

export interface SelectFieldProps extends BaseFieldProps {
  options: string[];
}

export interface OptionFieldProps {
  field: OptionDB;
  index: number;
  remove: (index: number) => void;
}
