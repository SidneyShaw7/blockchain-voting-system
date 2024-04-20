import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/login';
import { useNavigate } from 'react-router-dom';
import { toggleSidebar } from '../../features/sidebar';
import { RootState } from '../../app/store';

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  const handleLogout = () => {
    dispatch(logout());

    if (isOpen) {
      dispatch(toggleSidebar());
    }

    localStorage.removeItem('token');
    sessionStorage.clear();

    navigate('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
};
