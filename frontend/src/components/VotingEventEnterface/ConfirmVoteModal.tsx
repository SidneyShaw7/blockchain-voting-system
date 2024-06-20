import { Modal, Box, Typography } from '@mui/material';
import { modalStyle } from './modalStyle';
import { CancelButton, GreenButton } from '../Buttons';

const ConfirmVoteModal = ({
  isOpen,
  onClose,
  onConfirm,
  selectedOption,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedOption: string;
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography marginBottom={2} variant="h6" component="h2" className="mb-4 flex justify-center">
          Confirm Your Vote:
        </Typography>
        <Typography variant="body1" className="mb-4 mt-4 flex justify-center">
          <strong>{selectedOption}</strong>
        </Typography>
        <div className="flex justify-between mt-5 space-x-4">
          <CancelButton onClick={onClose}>Back</CancelButton>
          <GreenButton onClick={onConfirm}>Confirm</GreenButton>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmVoteModal;
