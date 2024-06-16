import { useEffect, useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { RootState, useDispatch, useSelector } from '../../store';
import { getOrganizations, updateOrganization, resetOrganizationState, addOrganization, deleteOrganization } from '../../features/organizations';
import { InputField, FileInputField } from '../helpers/helperFieldComponents';
import { OrganizationResponse } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrganizationSchema, OrganizationFormValues } from './OrganizationSchema';
import { error as showError, success as showSuccess } from '../../features/alert';
import { Modal } from '../common';

const OrganizationsPage = () => {
  const dispatch = useDispatch();
  const { data: organizations, isError, isSuccess, errorMessage } = useSelector((state: RootState) => state.organizations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [organizationToDelete, setOrganizationToDelete] = useState<OrganizationResponse | null>(null);

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
    } else if (isSuccess && isEditing) {
      dispatch(showSuccess({ message: 'Organization updated successfully!' }));
    } else if (isSuccess && !isAdding && !isEditing && organizationToDelete) {
      dispatch(showSuccess({ message: 'Organization deleted successfully!' }));
    }

    if (isError && errorMessage) {
      dispatch(showError({ message: errorMessage }));
    }

    if (isSuccess || isError) {
      dispatch(resetOrganizationState());
      setIsEditing(false);
      setIsAdding(false);
    }
  }, [dispatch, isSuccess, isError, errorMessage, isAdding, isEditing, organizationToDelete]);

  const onSubmit: SubmitHandler<OrganizationFormValues> = (data) => {
    if (selectedOrganization) {
      dispatch(updateOrganization({ id: selectedOrganization.id, formData: data }));
    } else {
      dispatch(addOrganization(data));
    }
  };

  const handleDelete = () => {
    if (organizationToDelete) {
      dispatch(deleteOrganization(organizationToDelete.id));
      setIsModalOpen(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {!isEditing && !isAdding && (
        <div>
          {organizations.length === 0 ? (
            <div>
              <p className="text-gray-500">No organizations yet.</p>
              <button
                onClick={() => setIsAdding(true)}
                className="inline-block shrink-0 rounded-md border border-[#FF5733] bg-[#FF5733] px-1 py-1 text-m font-medium text-white transition hover:bg-[#ff370c] hover:text-white focus:outline-none focus:ring active:text-[#ff370c] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
              >
                + Add Organization
              </button>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-bold mb-6">Organizations</h1>
              {organizations.map((org: OrganizationResponse) => (
                <div key={org.id} className="mb-4 border p-4 rounded">
                  <p>
                    <strong>Organization:</strong> {org.name}
                  </p>
                  <p>
                    <strong>Role:</strong> {org.role}
                  </p>
                  <p>
                    <strong>Users:</strong> {org.userCount}
                  </p>
                  <p>
                    <strong>Billing Email:</strong> {org.billingEmail}
                  </p>
                  <p>
                    <strong>Billing Address:</strong> {org.billingInfo}
                  </p>
                  <div className="flex space-x-2">
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
                    <button
                      onClick={() => {
                        setOrganizationToDelete(org);
                        setIsModalOpen(true);
                      }}
                      className="mt-2 bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setIsAdding(true)}
                className="inline-block shrink-0 rounded-md border border-[#FF5733] bg-[#FF5733] px-1 py-1 text-m font-medium text-white transition hover:bg-transparent hover:text-[#FF5733] focus:outline-none focus:ring active:text-[#FF5733]"
              >
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
            <button
              type="submit"
              className="inline-block shrink-0 rounded-md border border-[#00478F] bg-[#00478F] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#00478F] focus:outline-none focus:ring active:text-[#00478F]"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setIsAdding(false);
                methods.reset();
              }}
              className="inline-block shrink-0 rounded-md border border-[#00478F] bg-[#00478F] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#00478F] focus:outline-none focus:ring active:text-[#00478F]"
            >
              Cancel
            </button>
          </form>
        </FormProvider>
      )}
      <Modal
        title="Delete Organization"
        message={`Are you sure you want to delete the organization "${organizationToDelete?.name}"?`}
        isOpen={isModalOpen}
        onConfirm={handleDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default OrganizationsPage;
