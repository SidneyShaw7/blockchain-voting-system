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
  const [file, setFile] = useState<File | null>(null);

  const methods = useForm<VotingEventFormValues>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: '',
      description: '',
      options: [],
      startDate: new Date(),
      endDate: new Date(),
      timezone: 'UTC',
      votingMethod: 'Single choice',
      anonymity: false,
      resultVisibility: false,
      storageType: StorageType.Database,
      eventType: EventType.Candidate,
      createdBy: '',
      invitedPersons: [],
      file: null, // Initialize file field
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
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    if (file) {
      formData.append('file', file);
    }
    dispatch(createEvent(formData));
    setShouldNavigate(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Create a Ballot</h1>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <InputField label="Event Title" name="title" />
          <InputField label="Description" name="description" inputType="textarea" />
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
              Attach a file (PDF, etc.)
            </label>
            <input type="file" id="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
            {file && <p className="mt-2 text-sm text-gray-500">{file.name}</p>}
          </div>
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
          <SelectField name="timezone" label="Select Timezone" options={['UTC', 'EST', 'PST']} disabledOptions={['EST', 'PST']} />
          <SelectField
            name="votingMethod"
            label="Select Voting Method"
            options={['Single choice', 'Multiple choice', 'Ranked choice']}
            disabledOptions={['Multiple choice', 'Ranked choice']}
          />
          <CheckboxField name="anonymity" label="Anonymity Allowed" />
          <CheckboxField name="resultVisibility" label="Show Results Immediately" />
          <SelectField
            name="storageType"
            label="Select Storage Type"
            options={Object.values(StorageType)}
            disabledOptions={[StorageType.EthereumMainnet, StorageType.PrivateNetwork]}
          />
          <button
            type="submit"
            disabled={methods.formState.isSubmitting}
            className="inline-block shrink-0 rounded-sm border border-[#EFE7BC] bg-[#ff6747] px-3 py-2 text-m font-medium text-[#E7F2F8] transition hover:bg-[#F54D3D] hover:text-[#E7F2F8] focus:outline-none focus:ring active:text-[#ff370c] shadow-[2px_2px_0px_0px_rgba(116,189,203)] hover:shadow-[3px_3px_0px_0px_rgba(116,189,203)]"
          >
            Create Ballot
          </button>
        </form>
      </div>
    </FormProvider>
  );
};

export default CreateEventForm;
