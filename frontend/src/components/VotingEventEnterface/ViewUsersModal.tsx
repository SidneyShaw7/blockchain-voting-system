import { Modal, Box, Typography, List, ListItem } from '@mui/material';
import { SimpleUser } from '../../types';
import { modalStyle } from './modalStyle';
import { CancelButton, DeleteButton } from '../../components/Buttons';

interface ViewUsersModalProps {
  eventId: string;
  users: SimpleUser[];
  isOpen: boolean;
  onClose: () => void;
  canDelete: boolean;
  voters: string[];
  onRemoveUser: (userId: string) => void;
}

const ViewUsersModal = ({ users, isOpen, onClose, canDelete, voters, onRemoveUser }: ViewUsersModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
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
              {canDelete && !voters.includes(user.id) && (
                <Box sx={{ ml: 'auto' }}>
                  <DeleteButton onClick={() => onRemoveUser(user.id)}>Remove</DeleteButton>
                </Box>
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
