import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { EventSchema } from './EventSchema';
import { VotingEventFormValues, StorageType } from '../../types';
import { FieldSectionProps, DateFieldProps, SelectFieldProps, CheckboxFieldProps, OptionFieldProps } from '../../types';

const CreateVotingEventForm = () => {
  const initialValues: VotingEventFormValues = {
    title: '',
    description: '',
    options: [],
    startDate: new Date(),
    endDate: new Date(),
    timezone: '',
    voterEligibility: '',
    votingMethod: '',
    anonymity: false,
    resultVisibility: false,
    storageType: StorageType.Database,
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Create Voting Event</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={EventSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-4">
            <FieldSection name="title" placeholder="Event Title" />
            <FieldSection name="description" placeholder="Description" input="textarea" />

            <FieldArray name="options">
              {({ remove, push }) => (
                <div>
                  {values.options.map((_option, index) => (
                    <OptionField key={index} index={index} remove={remove} />
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ name: '', bio: '' })}
                    className="mt-2 bg-[#00478F] hover:bg-[#003B73] text-white py-1 px-2 rounded"
                  >
                    Add Candidate/Option
                  </button>
                </div>
              )}
            </FieldArray>
            <div className="flex items-center space-x-4">
              <DateField name="startDate" label="Start date:" values={values} setFieldValue={setFieldValue} />
              <DateField name="endDate" label="End date:" values={values} setFieldValue={setFieldValue} />
            </div>
            <SelectField name="timezone" label="Select Timezone" options={['UTC', 'EST', 'PST']} />
            <SelectField
              name="votingMethod"
              label="Select Voting Method"
              options={['singleChoice', 'multipleChoice', 'rankedChoice']}
            />

            <CheckboxField name="anonymity" label="Anonymity Allowed" />
            <CheckboxField name="resultVisibility" label="Show Results Immediately" />

            <SelectField name="storageType" label="Select Storage Type" options={Object.values(StorageType)} />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-min bg-[#00478F] hover:bg-[#003B73] text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

// helper components with saef typos
const FieldSection = ({ name, placeholder, input = 'input' }: FieldSectionProps) => (
  <div className="flex flex-col border-b border-[#00478F] py-2">
    <Field
      type={input}
      name={name}
      placeholder={placeholder}
      className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:ring-0"
    />
    <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
  </div>
);

const DateField = ({ name, label, values, setFieldValue }: DateFieldProps) => (
  <div className="flex items-center space-x-4">
    <span>{label}</span>
    <DatePicker
      selected={values[name]}
      onChange={(date) => setFieldValue(name, date)}
      className="w-full py-1 px-2 border-b border-[#00478F] rounded"
    />
  </div>
);

const SelectField = ({ name, label, options }: SelectFieldProps) => (
  <div>
    <Field as="select" name={name} className="w-full py-1 px-2 border-b border-[#00478F] rounded">
      <option value="">{label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </Field>
  </div>
);

const CheckboxField = ({ name, label }: CheckboxFieldProps) => (
  <div className="flex items-center space-x-2">
    <Field type="checkbox" name={name} className="leading-tight rounded" />
    <span>{label}</span>
  </div>
);

const OptionField = ({ index, remove }: OptionFieldProps) => (
  <div className="flex border-b border-[#00478F] py-2 items-center">
    <Field
      name={`options.${index}.name`}
      placeholder="Name"
      className="flex-grow appearance-none bg-transparent border-none text-gray-700 py-1 px-2 leading-tight focus:ring-0"
    />
    <Field
      name={`options.${index}.bio`}
      placeholder="Bio"
      className="flex-grow appearance-none bg-transparent border-none text-gray-700 py-1 px-2 leading-tight focus:ring-0"
    />
    <button type="button" onClick={() => remove(index)} className="ml-2 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">
      Remove
    </button>
  </div>
);

export default CreateVotingEventForm;
