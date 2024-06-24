import { useState } from 'react';
import { useDispatch } from '../../store';
import { inviteUserToOrganization, removeUserFromOrganization } from '../../features/organizations';
import { Modal, Box, Typography, List, ListItem, TextField, IconButton } from '@mui/material';
import { SimpleUser } from '../../types';
import { CancelButton, AddButton } from '../Buttons';
import DeleteIcon from '@mui/icons-material/Delete';
import { modalStyle } from './modalStyle';

interface ViewUsersModalProps {
  organizationId: string;
  users: SimpleUser[];
  isOpen: boolean;
  onClose: () => void;
  canDelete: boolean;
  adminId: string;
  onUserInvited: () => void;
}

const ViewUsersModal = ({ organizationId, users, isOpen, onClose, canDelete, adminId, onUserInvited }: ViewUsersModalProps) => {
  const [isAddingUsers, setIsAddingUsers] = useState(false);
  const [emails, setEmails] = useState('');
  const dispatch = useDispatch();

  const handleInvite = async () => {
    const emailList = emails
      .split(',')
      .map((email) => email.trim())
      .filter((email) => email !== '');
    if (emailList.length > 0) {
      try {
        await Promise.all(emailList.map((email) => dispatch(inviteUserToOrganization({ organizationId, email })).unwrap()));
        setEmails('');
        alert('Users invited successfully!');
        onUserInvited();
        setIsAddingUsers(false);
      } catch (error) {
        console.error('Failed to invite users:', error);
        alert('Failed to invite users.');
      }
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await dispatch(removeUserFromOrganization({ organizationId, userId })).unwrap();
      onUserInvited();
    } catch (error) {
      console.error('Failed to remove user from organization:', error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        {isAddingUsers ? (
          <>
            <Typography variant="h6" component="h2" className="mb-4 flex justify-center">
              Invite Users
            </Typography>
            <TextField
              placeholder="User Emails (comma separated)"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <div className="flex justify-between mt-3">
              <CancelButton onClick={() => setIsAddingUsers(false)}>Back</CancelButton>
              <AddButton onClick={handleInvite}>+ Add</AddButton>
            </div>
          </>
        ) : (
          <>
            <Typography variant="h6" component="h2" className="mb-4 flex justify-center">
              Users
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
                  <div className="ml-auto">
                    {user.id === adminId ? (
                      <Typography className="ml-2" variant="body2" color="textSecondary">
                        Admin
                      </Typography>
                    ) : (
                      canDelete && (
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteUser(user.id)}>
                          <DeleteIcon />
                        </IconButton>
                      )
                    )}
                  </div>
                </ListItem>
              ))}
            </List>
            <div className="flex justify-between mt-3">
              <CancelButton onClick={onClose}>Back</CancelButton>
              <AddButton onClick={() => setIsAddingUsers(true)}>+ Add Users</AddButton>
            </div>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ViewUsersModal;
