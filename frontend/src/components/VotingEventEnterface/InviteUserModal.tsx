import { useState } from 'react';
import { useDispatch } from '../../store';
import { inviteUser } from '../../features/manageEvent';
import { Modal, Box, TextField, Typography } from '@mui/material';
import { modalStyle } from './modalStyle';
import { AddButton, CancelButton } from '../Buttons';

const InviteUserModal = ({
  eventId,
  isOpen,
  onClose,
  onUserInvited,
}: {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
  onUserInvited: () => void;
}) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleInvite = async () => {
    if (email) {
      try {
        await dispatch(inviteUser({ eventId, email })).unwrap();
        setEmail('');
        alert('User invited successfully!');
        onUserInvited(); // Callback to refresh the event details
        onClose();
      } catch (error) {
        console.error('Failed to invite user:', error);
        alert('Failed to invite user.');
      }
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <div className="flex justify-center items-center mb-3">
          <Typography variant="h6" component="h2">
            Invite User
          </Typography>
        </div>
        <TextField label="User Email" value={email} onChange={(e) => setEmail(e.target.value)} variant="outlined" fullWidth margin="normal" />
        <div className="flex justify-between mt-3">
          <CancelButton onClick={onClose}>Back</CancelButton>
          <AddButton onClick={handleInvite}>+ Invite</AddButton>
        </div>
      </Box>
    </Modal>
  );
};

export default InviteUserModal;
