import { useEffect, useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { RootState, useDispatch, useSelector } from '../../store';
import { getOrganizations, updateOrganization, resetOrganizationState, addOrganization } from '../../features/organizations';
import { InputField, FileInputField } from '../helpers/helperFieldComponents';
import { OrganizationResponse } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrganizationSchema, OrganizationFormValues } from './OrganizationSchema';
import { error as showError, success as showSuccess } from '../../features/alert';

const OrganizationsPage = () => {
  const dispatch = useDispatch();
  const { data: organizations, isError, isSuccess, errorMessage } = useSelector((state: RootState) => state.organizations);

  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<OrganizationResponse | null>(null);

  const methods = useForm<OrganizationFormValues>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      name: '',
      location: '',
      description: '',
      logo: undefined,
      role: '',
      billingInfo: '',
      billingEmail: '',
    },
  });

  useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && isAdding) {
      dispatch(showSuccess({ message: 'Organization added successfully!' }));
    } else if (isSuccess) {
      // dispatch(showSuccess({ message: 'Organization updated successfully!' }));
    }
    if (isError && errorMessage) {
      dispatch(showError({ message: errorMessage }));
    }
    if (isSuccess || isError) {
      dispatch(resetOrganizationState());
      setIsEditing(false);
      setIsAdding(false);
    }
  }, [dispatch, isSuccess, isError, errorMessage, isAdding]);

  const onSubmit: SubmitHandler<OrganizationFormValues> = (data) => {
    console.log('Form data:', data); // Debugging: Log form data

    if (selectedOrganization) {
      dispatch(updateOrganization({ id: selectedOrganization.id, formData: data }));
    } else {
      dispatch(addOrganization(data));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Organisations</h1>
      {!isEditing && !isAdding && (
        <div>
          {organizations.length === 0 ? (
            <div>
              <p className="text-gray-500">No organizations yet.</p>
              <button onClick={() => setIsAdding(true)} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">
                + Add Organization
              </button>
            </div>
          ) : (
            <div>
              {organizations.map((org: OrganizationResponse) => (
                <div key={org.id} className="mb-4 border p-4 rounded">
                  <p>
                    <strong>Organization Name:</strong> {org.name}
                  </p>
                  <p>
                    <strong>User's Role:</strong> {org.role}
                  </p>
                  <p>
                    <strong>Number of Users:</strong> {org.userCount}
                  </p>
                  <p>
                    <strong>Billing Address:</strong> {org.billingInfo}
                  </p>
                  <p>
                    <strong>Billing Email:</strong> {org.billingEmail}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedOrganization(org);
                      setIsEditing(true);
                      methods.reset({
                        name: org.name,
                        location: org.location,
                        description: org.description,
                        logo: undefined,
                        role: org.role,
                        billingInfo: org.billingInfo,
                        billingEmail: org.billingEmail,
                      });
                    }}
                    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                  >
                    Edit
                  </button>
                </div>
              ))}
              <button onClick={() => setIsAdding(true)} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">
                + Add Organization
              </button>
            </div>
          )}
        </div>
      )}
      {(isEditing || isAdding) && (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <InputField label="Organization Name" name="name" />
            <InputField label="Location" name="location" />
            <InputField label="Description" name="description" inputType="textarea" />
            <FileInputField label="Logo" name="logo" />
            <InputField label="Role" name="role" />
            <InputField label="Billing Info" name="billingInfo" />
            <InputField label="Billing Email" name="billingEmail" />
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setIsAdding(false);
                methods.reset();
              }}
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
