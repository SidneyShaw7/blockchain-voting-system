import { useFormContext, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SelectFieldProps, BaseFieldProps, OptionFieldProps } from '../../types';
import { DeleteButton } from '../Buttons';

export const InputField = ({ label, name, inputType = 'input' }: BaseFieldProps & { inputType?: 'input' | 'textarea' }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-gray-700 font-medium">
        {label}
      </label>
      {inputType === 'textarea' ? (
        <textarea
          {...register(name)}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      ) : (
        <input
          {...register(name)}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      )}
      {errors[name] && <span className="text-red-500 text-sm mt-1">{errorMessage}</span>}
    </div>
  );
};

export const DateField = ({ name, label }: BaseFieldProps) => {
  const { control } = useFormContext();
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 font-medium">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            selected={field.value}
            onChange={field.onChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        )}
      />
    </div>
  );
};

export const SelectField = ({ name, label, options }: SelectFieldProps) => {
  const { register } = useFormContext();
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 font-medium">{label}</label>
      <select
        {...register(name)}
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export const CheckboxField = ({ name, label }: BaseFieldProps) => {
  const { register } = useFormContext();
  return (
    <div className="flex items-center mt-2">
      <input type="checkbox" {...register(name)} id={name} className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
      <label htmlFor={name} className="text-gray-700 font-medium">
        {label}
      </label>
    </div>
  );
};

export const OptionField = ({ index, remove }: OptionFieldProps) => {
  const { register } = useFormContext();
  return (
    <div className="flex items-center border-b border-gray-300 py-2">
      <input
        {...register(`options.${index}.name`)}
        placeholder="Name"
        className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      <input
        {...register(`options.${index}.bio`)}
        placeholder="Bio"
        className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
      <button type="button" onClick={() => remove(index)} className="ml-2 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded">
        Remove
      </button>
    </div>
  );
};

export const CandidateFields = ({ field, index, remove }: OptionFieldProps) => (
  <div key={field.id} className="py-2">
    <InputField label="Candidate Name" name={`options.${index}.name`} />
    <InputField label="Candidate Bio" name={`options.${index}.bio`} inputType="textarea" />
    <DeleteButton onClick={() => remove(index)}>Remove Candidate</DeleteButton>
  </div>
);

export const OptionFields = ({ field, index, remove }: OptionFieldProps) => (
  <div key={field.id}>
    <InputField label="Option Description" name={`options.${index}.option`} />
    <DeleteButton onClick={() => remove(index)}>Remove Option</DeleteButton>
  </div>
);
