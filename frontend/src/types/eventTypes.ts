export interface Candidate {
  name: string;
  bio: string;
}

export interface VotingEventFormValues {
  title: string;
  description: string;
  candidates: Candidate[];
  startDate: Date;
  endDate: Date;
  timezone: string;
  voterEligibility: string;
  votingMethod: string;
  anonymity: boolean;
  resultVisibility: boolean;
  blockchainNetwork: string;
}
