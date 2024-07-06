import { useState } from 'react';
import { useDispatch } from '../../store';
import { inviteUserToOrganization, leaveOrganization } from '../../features/organizations';
import { Modal, Box, Typography, List, ListItem, TextField } from '@mui/material';
import { SimpleUser } from '../../types';
import { CancelButton, AddButton, DeleteButton, LeaveButton } from '../Buttons';
import { modalStyle } from './modalStyle';
import { error as showError, success as showSuccess } from '../../features/alert/alertSlice';
import ConfirmModal from './ConfirmModal';

interface ViewUsersModalProps {
  organizationId: string;
  organizationName: string;
  users: SimpleUser[];
  isOpen: boolean;
  onClose: () => void;
  canDelete: boolean;
  onRemoveUser: (userId: string) => void;
  onUserInvited: () => void;
  adminId: string;
  currentUser: SimpleUser;
}

const ViewUsersModal = ({
  organizationId,
  organizationName,
  users,
  isOpen,
  onClose,
  canDelete,
  onRemoveUser,
  onUserInvited,
  adminId,
  currentUser,
}: ViewUsersModalProps) => {
  const [isAddingUsers, setIsAddingUsers] = useState(false);
  const [emails, setEmails] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleInvite = async () => {
    const emailList = emails
      .split(',')
      .map((email) => email.trim())
      .filter((email) => email !== '');
    if (emailList.length > 0) {
      try {
        await Promise.all(emailList.map((email) => dispatch(inviteUserToOrganization({ organizationId, email, role: 'member' })).unwrap()));
        setEmails('');
        dispatch(showSuccess({ message: 'Users invited successfully!' }));
        onUserInvited();
        setIsAddingUsers(false);
      } catch (error) {
        console.error('Failed to invite users:', error);
        dispatch(showError({ message: 'Failed to invite users.' }));
      }
    }
  };

  const handleLeaveOrganization = async () => {
    try {
      await dispatch(leaveOrganization(organizationId)).unwrap();
      setIsConfirmModalOpen(false);
      onClose();
    } catch (error) {
      console.error('Failed to leave organization:', error);
      dispatch(showError({ message: 'Failed to leave organization.' }));
    }
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    onClose();
  };

  return (
    <>
      <Modal open={isOpen && !isConfirmModalOpen} onClose={onClose}>
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
                    <div className="flex flex-col items-end ml-auto">
                      <Typography variant="body2" color="textSecondary">
                        {user.id === adminId ? 'Admin' : 'Member'}
                      </Typography>
                      {canDelete && user.id !== adminId && <DeleteButton onClick={() => onRemoveUser(user.id)}>Remove</DeleteButton>}
                    </div>
                  </ListItem>
                ))}
              </List>
              <div className="flex justify-between mt-3">
                <CancelButton onClick={onClose}>Back</CancelButton>
                {currentUser.id === adminId ? (
                  <AddButton onClick={() => setIsAddingUsers(true)}>+ Add Users</AddButton>
                ) : (
                  <LeaveButton onClick={() => setIsConfirmModalOpen(true)}>Leave Organization</LeaveButton>
                )}
              </div>
            </>
          )}
        </Box>
      </Modal>
      <ConfirmModal isOpen={isConfirmModalOpen} onClose={closeConfirmModal} onConfirm={handleLeaveOrganization} selectedOption={organizationName} />
    </>
  );
};

export default ViewUsersModal;
