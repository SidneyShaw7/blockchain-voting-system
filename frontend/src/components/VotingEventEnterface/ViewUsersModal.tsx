import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from '../../store';
import { deleteUserFromEvent } from '../../features/manageEvent';
import { Modal, Box, Typography } from '@mui/material';
import userService from '../../services/userService';
import { SimpleUser } from '../../types';
import { DeleteButton, CancelButton } from '../../components/Buttons';
import { modalStyle } from './modalStyle';

interface ViewUsersModalProps {
  eventId: string;
  userIds: string[];
  isOpen: boolean;
  onClose: () => void;
  canDelete: boolean;
  voters: string[];
}

const ViewUsersModal = ({ eventId, userIds, isOpen, onClose, canDelete, voters }: ViewUsersModalProps) => {
  const [users, setUsers] = useState<SimpleUser[]>([]);
  const dispatch = useDispatch();

  const fetchUsers = useCallback(async (ids: string[]) => {
    try {
      console.log('Fetching users with IDs:', ids);
      const response = await userService.getUsers(ids);
      console.log('Fetched users:', response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchUsers(userIds);
    }
  }, [isOpen, userIds, fetchUsers]);

  const handleDeleteUser = async (userId: string) => {
    try {
      await dispatch(deleteUserFromEvent({ eventId, userId })).unwrap();
      console.log('Deleted user:', userId);
      alert('User removed from event successfully!');
      const updatedUserIds = userIds.filter((id) => id !== userId);
      fetchUsers(updatedUserIds);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Failed to remove user from event:', error);
      alert('Failed to remove user from event.');
    }
  };

  useEffect(() => {
    console.log('User IDs have changed:', userIds);
  }, [userIds]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <div className="flex justify-center items-center mb-4">
          <Typography variant="h6" component="h2">
            Manage Users
          </Typography>
        </div>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="flex justify-between items-center mb-2">
              <div>
                <p>
                  {user.firstName} {user.lastName}
                </p>
                <p>{user.email}</p>
              </div>
              {canDelete && !voters.includes(user.id) && <DeleteButton onClick={() => handleDeleteUser(user.id)}>Remove</DeleteButton>}
            </li>
          ))}
        </ul>
        <div className="flex justify-start mt-4">
          <CancelButton onClick={onClose}>Back</CancelButton>
        </div>
      </Box>
    </Modal>
  );
};

export default ViewUsersModal;
