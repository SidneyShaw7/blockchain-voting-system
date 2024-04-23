import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { EventSchema } from './EventSchema';
// import { Candidate } from '../../types';

const CreateVotingEventForm = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Create Voting Event</h1>
      <Formik
        initialValues={{
          title: '',
          description: '',
          candidates: [{ name: '', bio: '' }],
          startDate: new Date(),
          endDate: new Date(),
          timezone: '',
          voterEligibility: '',
          votingMethod: '',
          anonymity: false,
          resultVisibility: false,
          blockchainNetwork: '',
        }}
        validationSchema={EventSchema}
        onSubmit={(values, { setSubmitting }) => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-4">
            <div className="flex flex-col border-b border-[#00478F] py-2">
              <Field
                name="title"
                type="text"
                placeholder="Event Title"
                className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:ring-0"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex flex-col border-b border-[#00478F] py-2">
              <Field
                as="textarea"
                name="description"
                placeholder="Description"
                className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:ring-0"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>

            <FieldArray name="candidates">
              {({ remove, push }) => (
                <div>
                  {values.candidates.map((_candidate, index) => (
                    <div key={index} className="flex flex-col border-b border-[#00478F] py-2">
                      <Field
                        name={`candidates.${index}.name`}
                        placeholder="Candidate Name"
                        className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:ring-0"
                      />
                      <Field
                        name={`candidates.${index}.bio`}
                        placeholder="Candidate Bio"
                        className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:ring-0"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="w-min bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push({ name: '', bio: '' })}
                    className="mt-2 bg-[#00478F] hover:bg-[#003B73] text-white py-1 px-2 rounded"
                  >
                    Add Candidate
                  </button>
                </div>
              )}
            </FieldArray>

            <div className="flex items-center space-x-4">
              <span>Start date:</span>
              <DatePicker
                selected={values.startDate}
                onChange={(date) => setFieldValue('startDate', date)}
                className="w-full py-1 px-2 border-b border-[#00478F] rounded"
              />
              <span>End date:</span>
              <DatePicker
                selected={values.endDate}
                onChange={(date) => setFieldValue('endDate', date)}
                className="w-full py-1 px-2 border-b border-[#00478F] rounded"
              />
            </div>
            
            <Field as="select" name="timezone" className="w-full py-1 px-2 border-b border-[#00478F] rounded">
              <option value="">Select Timezone</option>
              <option value="UTC">UTC</option>
              <option value="EST">EST</option>
              <option value="PST">PST</option>
            </Field>

            <Field as="select" name="votingMethod" className="w-full py-1 px-2 border-b border-[#00478F] rounded">
              <option value="">Select Voting Method</option>
              <option value="singleChoice">Single Choice</option>
              <option value="multipleChoice">Multiple Choice</option>
              <option value="rankedChoice">Ranked Choice</option>
            </Field>

            <div className="flex items-center space-x-2">
              <Field type="checkbox" name="anonymity" className="leading-tight rounded" />
              <span>Anonymity Allowed</span>
            </div>

            <div className="flex items-center space-x-2">
              <Field type="checkbox" name="resultVisibility" className="leading-tight rounded" />
              <span>Show Results Immediately</span>
            </div>

            <Field as="select" name="blockchainNetwork" className="w-full py-1 px-2 border-b border-[#00478F] rounded">
              <option value="">Select Blockchain Network</option>
              <option value="Ethereum Mainnet">Ethereum Mainnet</option>
              <option value="Private Network">Private Network</option>
            </Field>

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

export default CreateVotingEventForm;
