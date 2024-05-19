import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../features/sidebar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { RootState } from '../../store';

const ToggleButton: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  return (
    // <div className="fixed top-5 left-5 z-50">
    <IconButton
      onClick={() => dispatch(toggleSidebar())}
      color="primary"
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      aria-controls="sidebar"
      size="medium"
      sx={{
        color: '#FF5D00',
        // backgroundColor: '#42a5f5',
        '&:hover': {
          // backgroundColor: '#1e88e5',
          color: '#FF5D00',
        },
      }}
    >
      {isOpen ? <CloseIcon fontSize="inherit" /> : <MenuIcon fontSize="inherit" />}
    </IconButton>
    // </div>
  );
};

export default ToggleButton;
