import { ReactNode, useEffect, useState } from 'react';
import { Alert } from '../AlertComponent';
import { Sidebar } from '../Sidebar';
import { useSelector, RootState } from '../../store';
import { LogoutButton } from '../LogoutButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import CreateIcon from '@mui/icons-material/Create';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import { StyledIconButton, StyledMenuItem } from './styledComponents';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const firstName = useSelector((state: RootState) => state.login.data?.user.firstName);
  const lastName = useSelector((state: RootState) => state.login.data?.user.lastName);
  const isAuthenticated = useSelector((state: RootState) => state.login.isAuthenticated);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 768);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (e) => {
    const mainContent = e.target;
    if (mainContent.scrollTop > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('resize', handleResize);

      if (mainContent) {
        mainContent.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const isCurrentPage = (path: string) => location.pathname === path;

  const scrollToTop = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    { path: '/home', label: 'Home', Icon: HomeIcon },
    { path: '/events', label: 'Ballots', Icon: EventIcon },
    { path: '/event/create', label: 'Create', Icon: CreateIcon },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow py-3 flex justify-between items-center">
          <div className="text-left flex items-center">
            <h1 className="text-3xl font-bold acme-regular ml-5 mr-5">Secure Voting</h1>
            {!isScreenSmall &&
              navItems.map(({ path, label, Icon }) => (
                <Tooltip key={path} title={label} placement="bottom">
                  <NavLink to={path} className={({ isActive }) => (isActive ? 'text-[#ff6747] text-sm' : 'text-[#00478F] ml-5')}>
                    <StyledIconButton className={isCurrentPage(path) ? 'active ' : ''}>
                      <Icon sx={{ fontSize: 30 }} /> <span className={`text-lg ml-2 ${isCurrentPage(path) ? 'underline' : ''}`}>{label}</span>
                    </StyledIconButton>
                  </NavLink>
                </Tooltip>
              ))}
          </div>
          <div className="flex items-center">
            <p className="text-2xl font-semibold mr-2">
              {firstName} {lastName}
            </p>
            <span>
              <StyledIconButton
                onClick={handleMenuOpen}
                className={
                  isCurrentPage('/profile') || isCurrentPage('/organizations') || isCurrentPage('/billing') || isCurrentPage('/history')
                    ? 'active'
                    : ''
                }
              >
                <SettingsIcon sx={{ fontSize: 30 }} />
              </StyledIconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <StyledMenuItem className={isCurrentPage('/profile') ? 'active' : ''} onClick={() => handleMenuClick('/profile')}>
                  Profile
                </StyledMenuItem>
                <StyledMenuItem className={isCurrentPage('/organizations') ? 'active' : ''} onClick={() => handleMenuClick('/organizations')}>
                  Organizations
                </StyledMenuItem>
                <StyledMenuItem disabled className={isCurrentPage('/billing') ? 'active' : ''} onClick={() => handleMenuClick('/billing')}>
                  Billing
                </StyledMenuItem>
                <StyledMenuItem disabled className={isCurrentPage('/history') ? 'active' : ''} onClick={() => handleMenuClick('/history')}>
                  History
                </StyledMenuItem>
              </Menu>
            </span>
            <span className="mr-2">
              <LogoutButton />
            </span>
          </div>
        </header>
        <div className="flex flex-1 overflow-hidden">
          {isScreenSmall && <Sidebar />}
          {/* <main id="main-content" className="flex-1 overflow-y-auto p-4"> */}
          <main id="main-content" className="flex-1 overflow-y-auto flex flex-col">
            <div className='p-5'>
              <Alert />
              {children}
            </div>
            <footer className="mt-auto bg-white shadow p-2 text-center border-t-2 border-[#EFE7BC]">
              <p>© 2024 Secure Voting System. All rights reserved.</p>
            </footer>
          </main>
        </div>
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-12 right-12 bg-[#ff6747] text-white px-5 py-3.5 rounded-full shadow-lg hover:bg-[#F54D3D] transition duration-300"
          >
            ↑
          </button>
        )}
      </div>
    </div>
  );
};

export default MainLayout;
