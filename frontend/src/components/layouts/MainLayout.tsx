import { ReactNode, useEffect } from 'react';
import { Alert } from '../AlertComponent';
import { Sidebar } from '../Sidebar';
// import ToggleButton from '../ToggleButton/ToggleButton';
import { useSelector, RootState } from '../../store';
import { LogoutButton } from '../LogoutButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const firstName = useSelector((state: RootState) => state.login.data?.user.firstName);
  const lastName = useSelector((state: RootState) => state.login.data?.user.lastName);
  const isAuthenticated = useSelector((state: RootState) => state.login.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow p-1.5 flex justify-end items-center">
          <div className="text-right">
            <p className="text-xl font-semibold mr-3">
              {firstName} {lastName}
              <span className="ml-4">
                <button>
                  <SettingsIcon />
                </button>
              </span>
              <span className="ml-4">
                <LogoutButton />
              </span>
            </p>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4">
          <Alert />
          <div>{children}</div>
        </main>
        {/* <footer className="bg-white shadow p-2 text-center">
          footer info, links, social media icons
          <p>© 2024 Secure Voting System. All rights reserved.</p>
        </footer> */}
      </div>
    </div>
  );
};

export default MainLayout;
