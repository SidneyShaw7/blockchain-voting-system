import { ReactNode, useEffect, useState } from 'react';
import { Alert } from '../AlertComponent';
import { Sidebar } from '../Sidebar';
import { useSelector, RootState, useDispatch } from '../../store';
import { LogoutButton } from '../LogoutButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { toggleSidebar } from '../../features/sidebar';
import Menu from '@mui/material/Menu';
import { StyledIconButton, StyledMenuItem, StyledToggleButton } from './styledComponents';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 500);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (e) => {
    if (e.target.scrollTop > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsScreenSmall(window.innerWidth < 500);
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

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow py-3 flex justify-between items-center">
          <div className="text-left">
            <StyledToggleButton onClick={() => dispatch(toggleSidebar())} className={isSidebarOpen ? 'active' : ''} disabled={isScreenSmall}>
              {isSidebarOpen ? <CloseIcon sx={{ fontSize: 30 }} /> : <MenuIcon sx={{ fontSize: 30 }} />}
            </StyledToggleButton>
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
          <Sidebar />
          <main id="main-content" className="flex-1 overflow-y-auto p-4">
            <Alert />
            {children}
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
