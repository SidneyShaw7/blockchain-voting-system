import { useFormContext, Controller } from 'react-hook-form';

// interface InputFieldProps {
//   label: string;
//   name: string;
//   type?: string;
// }

interface BaseFieldProps {
  label: string;
  name: string;
}

interface InputFieldProps extends BaseFieldProps {
  type?: string;
  inputType?: 'input' | 'textarea';
}

// interface SelectFieldProps extends BaseFieldProps {
//   options: string[];
// }

// interface OptionFieldProps {
//   index: number;
//   remove: (index: number) => void;
// }

export const InputField = ({ label, name, type = 'text' }: InputFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="col-span-6 sm:col-span-3">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type={type}
            className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:border-[#00478F] ${
              errors[name] ? 'border-red-500' : ''
            }`}
          />
        )}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{(errors[name] as { message: string }).message}</p>}
    </div>
  );
};

export const FileInputField = ({ label, name }: BaseFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = (errors[name] as { message: string })?.message;

  return (
    <div className="flex flex-col py-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type="file"
            className={`mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:border-[#00478F] ${
              errors[name] ? 'border-red-500' : ''
            }`}
          />
        )}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
    </div>
  );
};
