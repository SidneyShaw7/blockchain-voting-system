import { useEffect } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { RootState, useDispatch, useSelector } from '../../store';
import { updateUserProfile, clearState } from '../../features/userProfile';
import { InputField } from '../helpers/helperFieldComponents';
import { UserProfileSchema, UserProfileFormValues } from './UserProfileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { error as showError, success as showSuccess } from '../../features/alert';
import { AddButton, CancelButton } from '../Buttons';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isSuccess, errorMessage } = useSelector((state: RootState) => state.userProfile);
  const { data: loginData } = useSelector((state: RootState) => state.login);

  const methods = useForm<UserProfileFormValues>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      firstName: loginData?.user.firstName || '',
      lastName: loginData?.user.lastName || '',
      username: loginData?.user.username || '',
      email: loginData?.user.email || '',
      password: '',
      newPassword: undefined,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(showSuccess({ message: 'Profile updated successfully!' }));
      dispatch(clearState());
      methods.reset({
        firstName: loginData?.user.firstName || '',
        lastName: loginData?.user.lastName || '',
        username: loginData?.user.username || '',
        email: loginData?.user.email || '',
        password: '',
        newPassword: '',
      });
    }
    if (isError && errorMessage) {
      dispatch(showError({ message: errorMessage }));
      dispatch(clearState());
    }
  }, [dispatch, isSuccess, isError, errorMessage, loginData, methods]);

  const onSubmit: SubmitHandler<UserProfileFormValues> = (data) => {
    dispatch(updateUserProfile(data));
  };

  return (
    <div className="flex justify-start items-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full p-8 mx-auto ml-12 max-[640px]:ml-0">
        <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <InputField label="First Name" name="firstName" />
            <InputField label="Last Name" name="lastName" />
            <InputField label="Username" name="username" />
            <InputField label="Email" name="email" type="email" />
            <h3 className="text-xl font-semibold">Change Password</h3>
            <InputField label="New Password" name="newPassword" type="password" />
            <h3 className="text-xl font-semibold">Enter Current Password to Update Settings</h3>
            <InputField label="Current Password" name="password" type="password" />
            <div className="space-x-4">
              <CancelButton onClick={() => navigate('/home')}>Cancel</CancelButton>
              <AddButton onClick={methods.handleSubmit(onSubmit)}>Save</AddButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ProfilePage;
