import { useFormContext, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SelectFieldProps, BaseFieldProps, OptionFieldProps } from '../../types';

export const InputField = ({ label, name, inputType = 'input' }: BaseFieldProps & { inputType?: 'input' | 'textarea' }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col py-2">
      <label htmlFor={name}>{label}</label>
      {inputType === 'textarea' ? (
        <textarea {...register(name)} className="w-full px-2 py-1" />
      ) : (
        <input {...register(name)} className="w-full px-2 py-1" />
      )}
      {errors[name] && <span className="text-red-500">{errorMessage}</span>}
    </div>
  );
};

export const DateField = ({ name, label }: BaseFieldProps) => {
  const { control } = useFormContext();
  return (
    <div className="flex items-center">
      <label>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker {...field} selected={field.value} onChange={field.onChange} className="w-full px-2 py-1" />
        )}
      />
    </div>
  );
};

export const SelectField = ({ name, label, options }: SelectFieldProps) => {
  const { register } = useFormContext();
  return (
    <div>
      <label>{label}</label>
      <select {...register(name)} className="w-full px-2 py-1">
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
    <div className="flex items-center">
      <input type="checkbox" {...register(name)} id={name} />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export const OptionField = ({ index, remove }: OptionFieldProps) => {
  const { register } = useFormContext();
  return (
    <div className="flex border-b border-blue-500 py-2 items-center">
      <input
        {...register(`options.${index}.name`)}
        placeholder="Name"
        className="flex-grow appearance-none bg-transparent border-none text-gray-700 py-1 px-2 leading-tight focus:ring-0"
      />
      <input
        {...register(`options.${index}.bio`)}
        placeholder="Bio"
        className="flex-grow appearance-none bg-transparent border-none text-gray-700 py-1 px-2 leading-tight focus:ring-0"
      />
      <button
        type="button"
        onClick={() => remove(index)}
        className="ml-2 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
      >
        Remove
      </button>
    </div>
  );
};
