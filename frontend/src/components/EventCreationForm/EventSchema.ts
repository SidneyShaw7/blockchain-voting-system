import * as Yup from 'yup';

export const EventSchema = Yup.object().shape({
  title: Yup.string().required('Event title is required'),
  description: Yup.string().required('Event description is required'),
  candidates: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Candidate name is required'),
      bio: Yup.string().required('Candidate bio is required'),
    })
  ),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().required('End date is required'),
  timezone: Yup.string().required('Timezone is required'),
  voterEligibility: Yup.string().required('Voter eligibility must be defined'),
  votingMethod: Yup.string().required('Voting method is required'),
  anonymity: Yup.boolean(),
  resultVisibility: Yup.boolean(),
  blockchainNetwork: Yup.string(),
});
