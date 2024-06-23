import { useState } from 'react';
import { useDispatch } from '../../store';
import { inviteUserToOrganization } from '../../features/organizations';
import { Modal, Box, TextField, Typography } from '@mui/material';
import { modalStyle } from './modalStyle';
import { AddButton, CancelButton } from '../Buttons';

interface InviteUserModalProps {
  organizationId: string;
  isOpen: boolean;
  onClose: () => void;
  onUserInvited: () => void;
}

const InviteUserModal = ({ organizationId, isOpen, onClose, onUserInvited }: InviteUserModalProps) => {
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
        onClose();
      } catch (error) {
        console.error('Failed to invite users:', error);
        alert('Failed to invite users.');
      }
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <div className="flex justify-center items-center mb-3">
          <Typography variant="h6" component="h2">
            Invite Users
          </Typography>
        </div>
        <TextField
          placeholder="User Emails (comma separated)"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <div className="flex justify-between mt-3">
          <CancelButton onClick={onClose}>Back</CancelButton>
          <AddButton onClick={handleInvite}>+ Invite</AddButton>
        </div>
      </Box>
    </Modal>
  );
};

export default InviteUserModal;
