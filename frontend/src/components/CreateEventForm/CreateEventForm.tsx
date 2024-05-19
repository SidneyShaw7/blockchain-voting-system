import 'react-datepicker/dist/react-datepicker.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { EventSchema } from './EventSchema';
import { VotingEventFormValues, StorageType, EventType } from '../../types';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { DateField, InputField, SelectField, CheckboxField } from './helperFieldComponents';
import { useDispatch, useSelector, RootState } from '../../store';
import { createEvent, resetEventState } from '../../features/manageEvent';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { error as showError } from '../../features/alert';

const CreateEventForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, data, isError, errorMessage } = useSelector((state: RootState) => state.votingEvent);

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

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'options',
  });

  useEffect(() => {
    if (isSuccess && data) {
      navigate(`/events/${data.id}`);
      dispatch(resetEventState());
    }
    if (isError && errorMessage) {
      console.error(errorMessage);
      dispatch(showError({ message: errorMessage }));
    }
  }, [dispatch, navigate, isSuccess, data, isError, errorMessage]);

  const { watch } = methods;
  const eventType = watch('eventType');

  const onSubmit = (data: VotingEventFormValues) => {
    dispatch(createEvent(data));
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Create Voting Event</h1>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <InputField label="Event Title" name="title" />
          <InputField label="Description" name="description" inputType="textarea" />
          <SelectField name="eventType" label="Event Type" options={['Candidate', 'General']} />

          {fields.map((field, index) =>
            eventType === EventType.Candidate ? (
              <div key={field.id}>
                <InputField label="Candidate Name" name={`options.${index}.name`} />
                <InputField label="Candidate Bio" name={`options.${index}.bio`} inputType="textarea" />
                <button type="button" onClick={() => remove(index)}>
                  Remove Candidate
                </button>
              </div>
            ) : (
              <div key={field.id}>
                <InputField label="Option Description" name={`options.${index}.option`} />
                <button type="button" onClick={() => remove(index)}>
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
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
          >
            Add {eventType === EventType.Candidate ? 'Candidate' : 'Option'}
          </button>

          <DateField name="startDate" label="Start date:" />
          <DateField name="endDate" label="End date:" />
          <SelectField name="timezone" label="Select Timezone" options={['UTC', 'EST', 'PST']} />
          <SelectField name="votingMethod" label="Select Voting Method" options={['singleChoice', 'multipleChoice', 'rankedChoice']} />
          <CheckboxField name="anonymity" label="Anonymity Allowed" />
          <CheckboxField name="resultVisibility" label="Show Results Immediately" />
          <SelectField name="storageType" label="Select Storage Type" options={Object.values(StorageType)} />

          <button
            type="submit"
            disabled={methods.formState.isSubmitting}
            className="w-min bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </FormProvider>
  );
};

export default CreateEventForm;
