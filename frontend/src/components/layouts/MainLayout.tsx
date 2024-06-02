import { ReactNode, useEffect } from 'react';
import { Alert } from '../AlertComponent';
import { Sidebar } from '../Sidebar';
// import ToggleButton from '../ToggleButton/ToggleButton';
import { useSelector, RootState, useDispatch } from '../../store';
import { LogoutButton } from '../LogoutButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { toggleSidebar } from '../../features/sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const firstName = useSelector((state: RootState) => state.login.data?.user.firstName);
  const lastName = useSelector((state: RootState) => state.login.data?.user.lastName);
  const isAuthenticated = useSelector((state: RootState) => state.login.isAuthenticated);
  const navigate = useNavigate();
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Auth state changed:', isAuthenticated);

    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow p-1.5 flex justify-between items-center">
          <div className="text-left">
            <button className="ml-3" onClick={() => dispatch(toggleSidebar())}>
              {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
          <div className="flex items-center">
            <p className="text-xl font-semibold mr-3">
              {firstName} {lastName}
            </p>
            <span className="mr-3">
              <button onClick={() => navigate('/profile')} className={location.pathname === '/profile' ? 'text-[#FF5D00]' : ''}>
                <SettingsIcon />
              </button>
            </span>
            <span className="mr-3">
              <LogoutButton />
            </span>
          </div>
        </header>
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-4">
            <Alert />
            {children}
          </main>
          {/* <footer className="bg-white shadow p-2 text-center">
          footer info, links, social media icons
          <p>© 2024 Secure Voting System. All rights reserved.</p>
        </footer> */}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
