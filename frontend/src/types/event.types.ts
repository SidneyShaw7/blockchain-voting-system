export interface Option {
  id: string;
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
  id: string;
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
  index: number;
  remove: (index: number) => void;
}

// event state

// export interface VotingEventState {
//   isProcessing: boolean;
//   isSuccess: boolean;
//   isError: boolean;
//   errorMessage?: string;
//   data?: VotingEventFormValues;
// }
