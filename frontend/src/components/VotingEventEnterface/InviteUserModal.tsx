import { useState } from 'react';
import { useDispatch } from '../../store';
import { inviteUser } from '../../features/manageEvent';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const InviteUserModal = ({ eventId, isOpen, onClose }: { eventId: string; isOpen: boolean; onClose: () => void }) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleInvite = async () => {
    if (email) {
      try {
        await dispatch(inviteUser({ eventId, email })).unwrap();
        setEmail('');
        alert('User invited successfully!');
        onClose();
      } catch (error) {
        console.error('Failed to invite user:', error);
        alert('Failed to invite user.');
      }
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6" component="h2">
            Invite User
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <TextField label="User Email" value={email} onChange={(e) => setEmail(e.target.value)} variant="outlined" fullWidth margin="normal" />
        <Button onClick={handleInvite} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Invite
        </Button>
      </Box>
    </Modal>
  );
};

export default InviteUserModal;
