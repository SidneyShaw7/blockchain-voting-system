import { useEffect, useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { RootState, useDispatch, useSelector } from '../../store';
import { getOrganizations, updateOrganization, resetOrganizationState } from '../../features/organizations';
import { InputField, FileInputField } from '../helpers/helperFieldComponents';
import { OrganizationFormValues, OrganizationResponse } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrganizationSchema } from './OrganizationSchema';
import { error as showError, success as showSuccess } from '../../features/alert';

const OrganizationsPage = () => {
  const dispatch = useDispatch();
  const { data: organisations, isError, isSuccess, errorMessage } = useSelector((state: RootState) => state.organizations);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedOrganisation, setSelectedOrganisation] = useState<OrganizationResponse | null>(null);

  const methods = useForm<OrganizationFormValues>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      name: '',
      location: '',
      description: '',
      logo: undefined,
      role: '',
    },
  });

  useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(showSuccess({ message: 'Organisation updated successfully!' }));
      dispatch(resetOrganizationState());
      setIsEditing(false);
    }
    if (isError && errorMessage) {
      dispatch(showError({ message: errorMessage }));
      dispatch(resetOrganizationState());
    }
  }, [dispatch, isSuccess, isError, errorMessage]);

  const onSubmit: SubmitHandler<OrganizationFormValues> = (data) => {
    if (selectedOrganisation) {
      dispatch(updateOrganization({ id: selectedOrganisation.id, formData: data }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Organisations</h1>
      {!isEditing ? (
        <div>
          {organisations.map((org: OrganizationResponse) => (
            <div key={org.id} className="mb-4 border p-4 rounded">
              <p>
                <strong>Organisation Name:</strong> {org.name}
              </p>
              <p>
                <strong>User's Role:</strong> {org.role}
              </p>
              <p>
                <strong>Number of Users:</strong> {org.userCount}
              </p>
              <p>
                <strong>Billing Info:</strong> {org.billingInfo}
              </p>
              <p>
                <strong>Billing Email:</strong> {org.billingEmail}
              </p>
              <button
                onClick={() => {
                  setSelectedOrganisation(org);
                  setIsEditing(true);
                  methods.reset({
                    name: org.name,
                    location: org.location,
                    description: org.description,
                    logo: undefined,
                    role: org.role,
                  });
                }}
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <InputField label="Organisation Name" name="name" />
            <InputField label="Location" name="location" />
            <InputField label="Description" name="description" inputType="textarea" />
            <FileInputField label="Logo" name="logo" />
            <InputField label="Role" name="role" />
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

export default OrganizationsPage;
