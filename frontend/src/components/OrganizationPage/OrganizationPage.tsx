import { useEffect, useState, useCallback } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { RootState, useDispatch, useSelector } from '../../store';
import { getOrganizations, updateOrganization, resetOrganizationState, addOrganization, deleteOrganization } from '../../features/organizations';
import { InputField, FileInputField } from '../helpers/helperFieldComponents';
import { OrganizationResponse, SimpleUser } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrganizationSchema } from './OrganizationSchema';
import { error as showError, success as showSuccess } from '../../features/alert';
import { OrganizationFormValues } from './OrganizationSchema';
import { Modal } from '../common';
import { AddButton, EditButton, CancelButton, DeleteButton, ViewButton } from '../Buttons';
import userService from '../../services/userService';
import ViewUsersModal from './ViewUsersModal';

const OrganizationsPage = () => {
  const dispatch = useDispatch();
  const { data: organizations, isError, isSuccess, errorMessage } = useSelector((state: RootState) => state.organizations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [organizationToDelete, setOrganizationToDelete] = useState<OrganizationResponse | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<OrganizationResponse | null>(null);
  const [isViewUsersModalOpen, setIsViewUsersModalOpen] = useState(false);
  const [users, setUsers] = useState<SimpleUser[]>([]);

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

  const fetchUsers = useCallback(async (userIds: string[]) => {
    try {
      console.log('Fetching users with IDs:', userIds);
      const response = await userService.getUsers(userIds);
      console.log('Fetched users:', response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  }, []);

  useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch]);

  useEffect(() => {
    if (selectedOrganization) {
      const allUserIds = [selectedOrganization.createdBy, ...(selectedOrganization.invitedPersons || [])];
      console.log('Fetching users for organization:', selectedOrganization, 'with user IDs:', allUserIds);
      console.log(allUserIds);
      console.log(selectedOrganization.invitedPersons);
      console.log(selectedOrganization.createdBy);
      fetchUsers(allUserIds);
    }
  }, [selectedOrganization, fetchUsers]);

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

  const handleViewUsers = (organization: OrganizationResponse) => {
    setSelectedOrganization(organization);
    setIsViewUsersModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {!isEditing && !isAdding && (
        <div>
          {organizations.length === 0 ? (
            <div>
              <p className="text-gray-500">No organizations yet.</p>
              <AddButton className="mt-4" onClick={() => setIsAdding(true)}>
                + Add Organization
              </AddButton>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-bold mb-6">Organizations</h1>
              {organizations.map((org: OrganizationResponse) => (
                <div
                  key={org.id}
                  className="relative bg-[#EAEFF2] border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div>
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
                    </div>
                  </div>
                  <EditButton
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
                    className="mt-3"
                  >
                    Edit
                  </EditButton>
                  {'  '}
                  <ViewButton onClick={() => handleViewUsers(org)} className="mt-3">
                    Users
                  </ViewButton>
                </div>
              ))}
              <AddButton
                className="mt-3"
                onClick={() => {
                  setIsAdding(true);
                  methods.reset({
                    name: '',
                    location: '',
                    description: '',
                    logo: undefined,
                    role: '',
                    billingInfo: '',
                    billingEmail: '',
                  });
                }}
              >
                + Add Organization
              </AddButton>
            </div>
          )}
        </div>
      )}
      {(isEditing || isAdding) && (
        <FormProvider {...methods}>
          <h1 className="text-3xl font-bold mb-6">Organization</h1>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 sm:w-96">
            <InputField label="Organization Name" name="name" />
            <InputField label="Location" name="location" />
            <InputField label="Description" name="description" inputType="textarea" />
            <FileInputField label="Logo" name="logo" />
            <InputField label="Role" name="role" />
            <InputField label="Billing Info" name="billingInfo" />
            <InputField label="Billing Email" name="billingEmail" />
            <div className="flex space-x-4">
              <CancelButton
                onClick={() => {
                  setIsEditing(false);
                  setIsAdding(false);
                  methods.reset();
                }}
              >
                Back
              </CancelButton>
              <AddButton onClick={methods.handleSubmit(onSubmit)}>Save</AddButton>
            </div>
            {isEditing && !isAdding && (
              <div className="mt-3">
                <DeleteButton
                  onClick={() => {
                    setOrganizationToDelete(selectedOrganization);
                    setIsModalOpen(true);
                  }}
                >
                  Delete organization
                </DeleteButton>
              </div>
            )}
          </form>
        </FormProvider>
      )}
      <ViewUsersModal
        organizationId={selectedOrganization?.id ?? ''}
        users={users}
        isOpen={isViewUsersModalOpen}
        onClose={() => setIsViewUsersModalOpen(false)}
        canDelete={true}
        adminId={selectedOrganization?.createdBy ?? ''}
        onUserInvited={() => fetchUsers([selectedOrganization!.createdBy, ...(selectedOrganization!.invitedPersons || [])])}
      />
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
