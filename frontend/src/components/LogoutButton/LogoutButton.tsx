import { useDispatch, useSelector, RootState } from '../../store';
import { logout } from '../../features/login';
import { useNavigate } from 'react-router-dom';
import { toggleSidebar } from '../../features/sidebar';
import { error as showError } from '../../features/alert/alertSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import LogoutIcon from '@mui/icons-material/Logout';
import { StyledIconButton } from './styledComponent';

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(logout());
      unwrapResult(resultAction);

      if (isOpen) {
        dispatch(toggleSidebar());
      }
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
      dispatch(showError({ message: 'Failed to logout.' }));
    }
  };

  return (
    <StyledIconButton onClick={handleLogout}>
      <LogoutIcon sx={{ fontSize: 30 }}/>
    </StyledIconButton>
  );
};
