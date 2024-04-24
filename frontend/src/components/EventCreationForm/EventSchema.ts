import * as Yup from 'yup';
// import { VotingEventFormValues } from '../../types';

export const EventSchema = Yup.object().shape({
  title: Yup.string().required('Event title is required'),
  description: Yup.string().required('Event description is required'),
  eventType: Yup.string().required('Event type is required'),
  options: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string(),
        bio: Yup.string(),
        option: Yup.string(),
      })
    )
    .when('eventType', {
      is: (val: string) => val === 'candidate', // checking if the event type is candidat
      then: (schema) =>
        schema.test('is-candidate', 'Name and Bio are required for candidates', (value) =>
          value ? value.every((v) => v.name && v.name.trim() !== '' && v.bio && v.bio.trim() !== '') : false
        ),
      otherwise: (schema) =>
        schema.test('is-option', 'Option is required for general votes', (value) =>
          value ? value.every((v) => v.option && v.option.trim() !== '') : false
        ),
    }),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().required('End date is required'),
  timezone: Yup.string().required('Timezone is required'),
  voterEligibility: Yup.string().required('Voter eligibility must be defined'),
  votingMethod: Yup.string().required('Voting method is required'),
  anonymity: Yup.boolean(),
  resultVisibility: Yup.boolean(),
  blockchainNetwork: Yup.string().when('storageType', {
    is: 'blockchain',
    then: (schema) => schema.required('Blockchain network is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  storageType: Yup.string().required('Storage type is required'),
});
