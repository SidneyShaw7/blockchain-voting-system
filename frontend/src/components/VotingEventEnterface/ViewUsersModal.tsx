import { useEffect, useState } from 'react';
import { useDispatch } from '../../store';
import { deleteUserFromEvent } from '../../features/manageEvent';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import userService from '../../services/userService';
import { SimpleUser } from '../../types'; // Import the new interface

interface ViewUsersModalProps {
  eventId: string;
  userIds: string[];
  isOpen: boolean;
  onClose: () => void;
}

const ViewUsersModal = ({ eventId, userIds, isOpen, onClose }: ViewUsersModalProps) => {
  const [users, setUsers] = useState<SimpleUser[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getUsers(userIds);
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    if (isOpen) {
      fetchUsers();
    }
  }, [userIds, isOpen]);

  const handleDeleteUser = async (userId: string) => {
    try {
      await dispatch(deleteUserFromEvent({ eventId, userId })).unwrap();
      alert('User removed from event successfully!');
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Failed to remove user from event:', error);
      alert('Failed to remove user from event.');
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ maxWidth: 500, margin: 'auto', padding: 4, backgroundColor: 'white', borderRadius: 4 }}>
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6" component="h2">
            Manage Users
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
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
              <Button onClick={() => handleDeleteUser(user.id)} variant="contained" color="secondary">
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </Box>
    </Modal>
  );
};

export default ViewUsersModal;
