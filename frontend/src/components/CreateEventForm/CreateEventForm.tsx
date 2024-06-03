import 'react-datepicker/dist/react-datepicker.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { EventSchema } from './EventSchema';
import { VotingEventFormValues, StorageType, EventType } from '../../types';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { DateField, InputField, SelectField, CheckboxField } from './helperFieldComponents';
import { useDispatch, useSelector, RootState } from '../../store';
import { createEvent, resetEventState } from '../../features/manageEvent';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { error as showError } from '../../features/alert';

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
      // voterEligibility: '',
      votingMethod: '',
      anonymity: false,
      resultVisibility: false,
      storageType: StorageType.Database,
      eventType: EventType.Candidate,
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
    dispatch(createEvent(data));
    setShouldNavigate(true);
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Create Voting Event</h1>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <InputField label="Event Title" name="title" />
          <InputField label="Description" name="description" inputType="textarea" />
          <SelectField name="eventType" label="Event Type" options={['Candidate', 'General']} />

          {fields.map((field, index) =>
            eventType === EventType.Candidate ? (
              <div key={field.id} className="border-b border-gray-300 py-4">
                <InputField label="Candidate Name" name={`options.${index}.name`} />
                <InputField label="Candidate Bio" name={`options.${index}.bio`} inputType="textarea" />
                <button type="button" onClick={() => remove(index)}>
                  Remove Candidate
                </button>
              </div>
            ) : (
              <div key={field.id}>
                <InputField label="Option Description" name={`options.${index}.option`} />
                <button type="button" onClick={() => remove(index)} className="mt-2 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">
                  Remove Option
                </button>
              </div>
            )
          )}
          <button
            type="button"
            onClick={() =>
              append(
                eventType === EventType.Candidate ? { name: '', bio: '', option: '', voters: [], votes: 0 } : { option: '', voters: [], votes: 0 }
              )
            }
            className="inline-block shrink-0 rounded-md border border-[#00478F] bg-[#00478F] px-6 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#00478F] focus:outline-none focus:ring active:text-[#00478F]"
          >
            Add {eventType === EventType.Candidate ? 'Candidate' : 'Option'}
          </button>

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
            className="inline-block shrink-0 rounded-md border border-[#00478F] bg-[#00478F] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#00478F] focus:outline-none focus:ring active:text-[#00478F]"
          >
            Submit
          </button>
        </form>
      </div>
    </FormProvider>
  );
};

export default CreateEventForm;
