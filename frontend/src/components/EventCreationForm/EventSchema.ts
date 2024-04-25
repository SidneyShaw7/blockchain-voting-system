import * as Yup from 'yup';
import { StorageType } from '../../types';
// import { VotingEventFormValues } from '../../types';

export const EventSchema = Yup.object().shape({
  title: Yup.string().required('Event title is required'),
  description: Yup.string().required('Event description is required'),
  eventType: Yup.string().required('Event type is required'),
  options: Yup.array().of(
    Yup.object().when('eventType', (eventType, schema) =>
      eventType === 'candidate'
        ? schema.shape({
            name: Yup.string().required('Candidate name is required'),
            bio: Yup.string().required('Candidate bio is required'),
            option: Yup.string().notRequired(),
          })
        : schema.shape({
            option: Yup.string().required('Option description is required'),
            name: Yup.string().notRequired(),
            bio: Yup.string().notRequired(),
          })
    )
  ),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().required('End date is required'),
  timezone: Yup.string().required('Timezone is required'),
  voterEligibility: Yup.string().required('Voter eligibility must be defined'),
  votingMethod: Yup.string().required('Voting method is required'),
  anonymity: Yup.boolean(),
  resultVisibility: Yup.boolean(),
  storageType: Yup.mixed().oneOf(Object.values(StorageType)).required('Storage type is required'),
});
