import { useEffect, useState, useCallback } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import {
  getOrganizations,
  updateOrganization,
  resetOrganizationState,
  addOrganization,
  deleteOrganization,
  removeUserFromOrganization,
} from '../../features/organizations';
import { RootState, useDispatch, useSelector } from '../../store';
import { InputField, FileInputField } from '../helpers/helperFieldComponents';
import { OrganizationResponse, SimpleUser, OrganizationFormValues } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrganizationSchema } from './OrganizationSchema';
import { error as showError, success as showSuccess } from '../../features/alert';
import { Modal } from '../common';
import { AddButton, EditButton, CancelButton, DeleteButton, ViewButton } from '../Buttons';
import userService from '../../services/userService';
import ViewUsersModal from './ViewUsersModal';

const OrganizationsPage = () => {
  const dispatch = useDispatch();
  const { data: organizations, isError, isSuccess, errorMessage } = useSelector((state: RootState) => state.organizations);
  const currentUser = useSelector((state: RootState) => state.login.data?.user) as SimpleUser | undefined;
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
      billingInfo: '',
      billingEmail: '',
      users: [],
    },
  });

  const fetchUsers = useCallback(async (userIds: string[]) => {
    try {
      const response = await userService.getUsers(userIds);
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
      const allUserIds = [selectedOrganization.createdBy, ...selectedOrganization.users.map((u) => u.userId)];
      fetchUsers(allUserIds);
    }
  }, [selectedOrganization, fetchUsers]);

  useEffect(() => {
    if (isSuccess) {
      if (isAdding) {
        dispatch(showSuccess({ message: 'Organization added successfully!' }));
      } else if (isEditing) {
        dispatch(showSuccess({ message: 'Organization updated successfully!' }));
      } else if (organizationToDelete) {
        dispatch(showSuccess({ message: 'Organization deleted successfully!' }));
      }
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
    const updatedUsers = [...(data.users ?? []), { userId: currentUser!.id, role: 'admin' }];
    const formData = { ...data, users: updatedUsers };

    if (selectedOrganization) {
      dispatch(updateOrganization({ id: selectedOrganization.id, formData }));
    } else {
      dispatch(addOrganization(formData));
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

  const handleEdit = (org: OrganizationResponse) => {
    setSelectedOrganization(org);
    setIsEditing(true);
    methods.reset({
      name: org.name,
      location: org.location,
      description: org.description,
      logo: undefined,
      billingInfo: org.billingInfo,
      billingEmail: org.billingEmail,
      users: org.users,
    });
  };

  const handleUserInvited = () => {
    if (selectedOrganization) {
      const allUserIds = [selectedOrganization.createdBy, ...selectedOrganization.users.map((u) => u.userId)];
      console.log(allUserIds);
      fetchUsers(allUserIds);
    }
  };

  const handleRemoveUser = async (userId: string) => {
    if (selectedOrganization) {
      try {
        await dispatch(removeUserFromOrganization({ organizationId: selectedOrganization.id, userId })).unwrap();
        const updatedUserIds = users.filter((user) => user.id !== userId).map((user) => user.id);
        fetchUsers(updatedUserIds);
      } catch (error) {
        console.error('Failed to remove user from organization:', error);
        dispatch(showError({ message: 'Failed to remove user from organization.' }));
      }
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w mx-auto p-5">
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
              <table className="w-full bg-white">
                <thead className="bg-[#00478F] text-white">
                  <tr>
                    <th className="py-2 px-4 border text-start">Organization</th>
                    <th className="py-2 px-4 border text-start">Your Role</th>
                    <th className="py-2 px-4 border text-start">Number of Users</th>
                    <th className="py-2 px-4 border text-start">Billing Email</th>
                    <th className="py-2 px-4 border text-start">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-[#E7F2F8]">
                  {organizations.map((org: OrganizationResponse) => {
                    const isAdmin = currentUser && org.createdBy === currentUser.id;
                    return (
                      <tr key={org.id}>
                        <td className="py-2 px-4 border">{org.name}</td>
                        <td className="py-2 px-4 border">{isAdmin ? 'Admin' : 'User'}</td>
                        <td className="py-2 px-4 border text-center">{org.userCount}</td>
                        <td className="py-2 px-4 border">{org.billingEmail}</td>
                        <td className="py-2 px-4 border">
                          <ViewButton onClick={() => handleViewUsers(org)} className="mr-2">
                            View Users
                          </ViewButton>
                          |
                          {isAdmin ? (
                            <>
                              <EditButton onClick={() => handleEdit(org)} className="ml-2">
                                Edit
                              </EditButton>
                            </>
                          ) : (
                            'Ask Admin for permission'
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <AddButton
                className="mt-3"
                onClick={() => {
                  setIsAdding(true);
                  methods.reset({
                    name: '',
                    location: '',
                    description: '',
                    logo: undefined,
                    billingInfo: '',
                    billingEmail: '',
                    users: [],
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
          <h1 className="text-3xl font-bold mb-6">Organization / {selectedOrganization?.name}</h1>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4 sm:w-96">
            <InputField label="Organization Name" name="name" />
            <InputField label="Location" name="location" />
            <InputField label="Description" name="description" inputType="textarea" />
            <FileInputField label="Logo" name="logo" />
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
        organizationName={selectedOrganization?.name ?? ''}
        users={users}
        isOpen={isViewUsersModalOpen}
        onClose={() => setIsViewUsersModalOpen(false)}
        canDelete={currentUser?.id === selectedOrganization?.createdBy}
        adminId={selectedOrganization?.createdBy ?? ''}
        onUserInvited={handleUserInvited}
        onRemoveUser={handleRemoveUser}
        currentUser={currentUser}
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
