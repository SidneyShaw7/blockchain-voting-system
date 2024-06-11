import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../features/sidebar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { RootState } from '../../store';
import IconButton from '@mui/material/IconButton';
// import { styled } from '@mui/material/styles';

// const StyledIconButton = styled(IconButton)(() => ({
//   color: '#000',
// }));

const ToggleButton = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  return (
    <IconButton onClick={() => dispatch(toggleSidebar())}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
      {/* // </IconButton> */}
    </IconButton>
  );
};

export default ToggleButton;
