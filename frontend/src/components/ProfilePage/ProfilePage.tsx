import { useEffect, useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { RootState, useDispatch, useSelector } from '../../store';
import { updateUserProfile, clearState } from '../../features/userProfile';
import { InputField, FileInputField } from '../helpers/helperFieldComponents';
import { UserProfileSchema, UserProfileFormValues } from './UserProfileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { error as showError, success as showSuccess } from '../../features/alert';
import { AddButton, EditButton, CancelButton } from '../Buttons';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { isError, isSuccess, errorMessage } = useSelector((state: RootState) => state.userProfile);
  const { data: loginData } = useSelector((state: RootState) => state.login);

  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(loginData?.user.avatar);

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
      dispatch(clearState());
      setIsEditing(false);
    }
    if (isError && errorMessage) {
      dispatch(showError({ message: errorMessage }));
      dispatch(clearState());
    }
  }, [dispatch, isSuccess, isError, errorMessage]);

  const onSubmit: SubmitHandler<UserProfileFormValues> = (data) => {
    dispatch(updateUserProfile(data));
  };

  const handleAvatarChange = (file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(loginData?.user.avatar);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      {/* {isError && dispatch(showError({ message: errorMessage }))}
      {isSuccess && <div className="text-green-500 mb-4">Profile updated successfully!</div>} */}

      {!isEditing ? (
        <div>
          <div className="text-l mb-6 space-y-4">
            {loginData?.user.avatar ? (
              <div className="mt-4">
                {typeof loginData.user.avatar === 'string' ? (
                  <img src={loginData.user.avatar} alt="Avatar" className="h-20 w-20 rounded-full" />
                ) : (
                  <img src={URL.createObjectURL(loginData.user.avatar)} alt="Avatar" className="h-20 w-20 rounded-full" />
                )}
              </div>
            ) : (
              <div>
                <img src="/src/images/default_avatar.jpeg" alt="Avatar" className="h-20 w-20 rounded-full" />
              </div>
            )}
            <div>
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
            </div>
            <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
          </div>
        </div>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 sm:w-96">
            <InputField label="First Name" name="firstName" />
            <InputField label="Last Name" name="lastName" />
            <InputField label="Username" name="username" />
            <InputField label="Email" name="email" type="email" />
            <InputField label="Password" name="password" type="password" />
            <InputField label="New Password" name="newPassword" type="password" />
            {avatarPreview && (
              <div className="mb-4">
                <img src={avatarPreview} alt="Avatar Preview" className="h-20 w-20 rounded-full" />
              </div>
            )}
            <FileInputField label="Avatar" name="avatar" onChange={(file) => handleAvatarChange(file)} />
            <CancelButton onClick={() => setIsEditing(false)}>Back</CancelButton>
            <AddButton onClick={methods.handleSubmit(onSubmit)}>Save</AddButton>{' '}
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default ProfilePage;
