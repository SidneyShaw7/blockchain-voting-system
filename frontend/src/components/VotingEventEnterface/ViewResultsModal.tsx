import { Modal, Box, Typography, List, ListItem } from '@mui/material';
import { VotingEventFormValuesDB } from '../../types';
import { CancelButton } from '../Buttons';
import { modalStyle } from './modalStyle';

interface ViewResultsModalProps {
  event: VotingEventFormValuesDB;
  isOpen: boolean;
  onClose: () => void;
}

const ViewResultsModal = ({ event, isOpen, onClose }: ViewResultsModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" className="mb-4 flex justify-center">
          Results
        </Typography>
        <List>
          {event.options.map((option) => (
            <ListItem key={option.id} className="flex justify-between items-center">
              <div>
                <Typography>{option.name || option.option}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {option.bio}
                </Typography>
              </div>
              <div className="ml-auto">
                <Typography variant="body2" color="textSecondary">
                  Votes: {option.votes}
                </Typography>
              </div>
            </ListItem>
          ))}
        </List>
        <div className="flex justify-start mt-3">
          <CancelButton onClick={onClose}>Back</CancelButton>
        </div>
      </Box>
    </Modal>
  );
};

export default ViewResultsModal;
