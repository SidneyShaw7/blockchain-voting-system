import { Modal, Box, Typography } from '@mui/material';
import { modalStyle } from './modalStyle';
import { CancelButton, LeaveButton } from '../Buttons';

const ConfirmModal = ({
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
        <Typography variant="h6" component="h2" mb={4} className="flex justify-center">
          Leave the organization?
        </Typography>
        <Typography variant="body1" mb={4} className=" mt-4 flex justify-center">
          <strong>{selectedOption}</strong>
        </Typography>
        <div className="flex justify-between mt-5 space-x-4">
          <CancelButton onClick={onClose}>Back</CancelButton>
          <LeaveButton onClick={onConfirm}>Leave</LeaveButton>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
