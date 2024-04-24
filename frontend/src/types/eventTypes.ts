export interface CandidateDetails {
  name: string;
  bio: string;
}

interface GeneralVoteOption {
  option: string;
}

export enum StorageType {
  Database = 'Database',
  EthereumMainnet = 'Ethereum Mainnet',
  PrivateNetwork = 'Private Network',
}


export interface VotingEventFormValues {
  title: string;
  description: string;
  options: CandidateDetails[] | GeneralVoteOption[];
  startDate: Date;
  endDate: Date;
  timezone: string;
  voterEligibility: string;
  votingMethod: string;
  anonymity: boolean;
  resultVisibility: boolean;
  storageType?: StorageType;
}

// Define prop types for the helper components
export interface FieldSectionProps {
    name: string;
    placeholder: string;
    input?: React.ElementType;
  }
  
 export interface DateFieldProps {
    name: string;
    label: string;
    values: any;
    setFieldValue: (field: string, value: any) => void;
  }
  
 export interface SelectFieldProps {
    name: string;
    label: string;
    options: string[];
  }
  
 export interface CheckboxFieldProps {
    name: string;
    label: string;
  }
  
 export interface OptionFieldProps {
    index: number;
    remove: (index: number) => void;
  }