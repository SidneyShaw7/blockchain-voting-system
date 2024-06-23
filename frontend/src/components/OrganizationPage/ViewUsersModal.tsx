import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from '../../store';
import { removeUserFromOrganization } from '../../features/organizations';
import { Modal, Box, Typography, List, ListItem, IconButton } from '@mui/material';
import userService from '../../services/userService';
import { SimpleUser } from '../../types';
import { CancelButton } from '../Buttons';
import DeleteIcon from '@mui/icons-material/Delete';
import { modalStyle } from './modalStyle';

interface ViewUsersModalProps {
  organizationId: string;
  userIds: string[];
  isOpen: boolean;
  onClose: () => void;
  canDelete: boolean;
}

const ViewUsersModal = ({ organizationId, userIds, isOpen, onClose, canDelete }: ViewUsersModalProps) => {
  const [users, setUsers] = useState<SimpleUser[]>([]);
  const dispatch = useDispatch();

  const fetchUsers = useCallback(async (ids: string[]) => {
    try {
      const response = await userService.getUsers(ids);
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
      await dispatch(removeUserFromOrganization({ organizationId, userId })).unwrap();
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Failed to remove user from organization:', error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" className="mb-4">
          Invited Users
        </Typography>
        <List>
          {users.map((user) => (
            <ListItem key={user.id} className="flex justify-between items-center">
              <div>
                <Typography>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.email}
                </Typography>
              </div>
              {canDelete && (
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteUser(user.id)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </ListItem>
          ))}
        </List>
        <div className="flex justify-between mt-3">
          <CancelButton onClick={onClose}>Back</CancelButton>
        </div>
      </Box>
    </Modal>
  );
};

export default ViewUsersModal;
