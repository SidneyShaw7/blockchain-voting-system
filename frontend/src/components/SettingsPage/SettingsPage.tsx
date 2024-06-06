import { useEffect, useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { RootState, useDispatch, useSelector } from '../../store';
import { updateUserProfile } from '../../features/userProfile';
import { InputField, FileInputField } from '../helpers/helperFieldComponents';
import { UserProfileSchema, UserProfileFormValues } from './UserProfileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
// import { clear } from '../../features/alert/alertSlice';
import { error as showError, success as showSuccess } from '../../features/alert';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const { isError, isSuccess, errorMessage } = useSelector((state: RootState) => state.userProfile);
  const { data: loginData } = useSelector((state: RootState) => state.login);

  const [isEditing, setIsEditing] = useState(false);

  const defaultValues: UserProfileFormValues = {
    firstName: loginData?.user.firstName || '',
    lastName: loginData?.user.lastName || '',
    username: loginData?.user.username || '',
    email: loginData?.user.email || '',
    password: '',
    newPassword: undefined,
    avatar: undefined,
  };

  const methods = useForm<UserProfileFormValues>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(showSuccess({ message: 'Profile updated successfully!' }));
      // dispatch(clear());
      setIsEditing(false);
    }
    if (isError && errorMessage) {
      dispatch(showError({ message: errorMessage }));
    }
  }, [dispatch, isSuccess, isError, errorMessage]);

  const onSubmit: SubmitHandler<UserProfileFormValues> = (data) => {
    dispatch(updateUserProfile(data));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      {/* {isError && dispatch(showError({ message: errorMessage }))}
      {isSuccess && <div className="text-green-500 mb-4">Profile updated successfully!</div>} */}

      {!isEditing ? (
        <div>
          <div className="mb-4">
            <p>
              <strong>First Name:</strong> {loginData?.user.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {loginData?.user.lastName}
            </p>
            <p>
              <strong>Username:</strong> {loginData?.user.username}
            </p>
            <p>
              <strong>Email:</strong> {loginData?.user.email}
            </p>
            {loginData?.user.avatar && (
              <div className="mt-4">
                {typeof loginData.user.avatar === 'string' ? (
                  <img src={loginData.user.avatar} alt="Avatar" className="h-20 w-20 rounded-full" />
                ) : (
                  <img src={URL.createObjectURL(loginData.user.avatar)} alt="Avatar" className="h-20 w-20 rounded-full" />
                )}
              </div>
            )}
          </div>
          <button onClick={() => setIsEditing(true)} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Make Changes
          </button>
        </div>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <InputField label="First Name" name="firstName" />
            <InputField label="Last Name" name="lastName" />
            <InputField label="Username" name="username" />
            <InputField label="Email" name="email" type="email" />
            <InputField label="password" name="password" type="password" />
            <InputField label="New Password" name="newPassword" type="password" />
            <FileInputField label="Avatar" name="avatar" />
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="w-full bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded mt-4"
            >
              Cancel
            </button>
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default SettingsPage;
