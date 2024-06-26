import 'react-datepicker/dist/react-datepicker.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { EventSchema } from './EventSchema';
import { VotingEventFormValues, StorageType, EventType } from '../../types';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { DateField, InputField, SelectField, CheckboxField, OptionFields, CandidateFields } from './helperFieldComponents';
import { useDispatch, useSelector, RootState } from '../../store';
import { createEvent, resetEventState } from '../../features/manageEvent';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { error as showError } from '../../features/alert';
import { AddButton } from '../Buttons';

const predefinedOptions = [
  { option: 'Yes, I approve', voters: [], votes: 0 },
  { option: 'No, I reject', voters: [], votes: 0 },
  { option: 'Abstain', voters: [], votes: 0 },
];

const CreateEventForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, data, isError, errorMessage } = useSelector((state: RootState) => state.votingEvent);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const methods = useForm<VotingEventFormValues>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: '',
      description: '',
      options: [],
      startDate: new Date(),
      endDate: new Date(),
      timezone: '',
      votingMethod: '',
      anonymity: false,
      resultVisibility: false,
      storageType: StorageType.Database,
      eventType: EventType.Candidate,
      createdBy: '',
      invitedPersons: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: methods.control,
    name: 'options',
  });

  useEffect(() => {
    if (shouldNavigate && isSuccess && data) {
      navigate(`/events/${data.id}`);
      dispatch(resetEventState());
      setShouldNavigate(false);
    }
    if (isError && errorMessage) {
      console.error(errorMessage);
      dispatch(showError({ message: errorMessage }));
    }
  }, [dispatch, navigate, isSuccess, data, isError, errorMessage, shouldNavigate]);

  const { watch } = methods;
  const eventType = watch('eventType');

  useEffect(() => {
    if (eventType === EventType.General) {
      replace(predefinedOptions);
    } else {
      replace([]);
    }
  }, [eventType, replace]);

  const onSubmit = (data: VotingEventFormValues) => {
    console.log('Form data before submit:', data);
    dispatch(createEvent(data));
    setShouldNavigate(true);
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Create a Ballot</h1>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <InputField label="Event Title" name="title" />
          <InputField label="Description" name="description" inputType="textarea" />
          <SelectField name="eventType" label="Event Type" options={Object.values(EventType)} />

          {fields.map((field, index) =>
            eventType === EventType.Candidate ? (
              <CandidateFields key={field.id} field={field} index={index} remove={remove} />
            ) : (
              <OptionFields key={field.id} field={field} index={index} remove={remove} />
            )
          )}
          <AddButton
            onClick={() =>
              append(
                eventType === EventType.Candidate ? { name: '', bio: '', option: '', voters: [], votes: 0 } : { option: '', voters: [], votes: 0 }
              )
            }
          >
            Add {eventType === EventType.Candidate ? 'Candidate' : 'Option'}
          </AddButton>

          <DateField name="startDate" label="Start date:" />
          <DateField name="endDate" label="End date:" />
          <SelectField name="timezone" label="Select Timezone" options={['UTC', 'EST', 'PST']} />
          <SelectField name="votingMethod" label="Select Voting Method" options={['Single choice', 'Multiple choice', 'Ranked choice']} />
          <CheckboxField name="anonymity" label="Anonymity Allowed" />
          <CheckboxField name="resultVisibility" label="Show Results Immediately" />
          <SelectField name="storageType" label="Select Storage Type" options={Object.values(StorageType)} />

          <button
            type="submit"
            disabled={methods.formState.isSubmitting}
            className="inline-block shrink-0 rounded-md border border-[#ff6747] bg-[#ff6747] px-3 py-2 text-m font-medium text-white transition hover:bg-[#ff370c] hover:text-white focus:outline-none focus:ring active:text-[#ff370c] shadow-[2.0px_6.0px_6.0px_rgba(0,0,0,0.38)] hover:shadow-[3.0px_7.0px_7.0px_rgba(0,0,0,0.38)]"
          >
            Submit
          </button>
        </form>
      </div>
    </FormProvider>
  );
};

export default CreateEventForm;
