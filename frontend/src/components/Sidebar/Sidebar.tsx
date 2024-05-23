import { RootState, useDispatch, useSelector } from '../../store';
import { useLocation, NavLink } from 'react-router-dom';
// import { useState } from 'react';
// import { LogoutButton } from '../LogoutButton';
import { toggleSidebar } from '../../features/sidebar';
// import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import CreateIcon from '@mui/icons-material/Create';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const Sidebar = () => {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  const location = useLocation();

  // const [isEventsOpen, setEventsOpen] = useState(false);

  const handleCloseSidebar = () => {
    if (isOpen) {
      dispatch(toggleSidebar());
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/home', label: 'Home', Icon: HomeIcon },
    { path: '/events', label: 'Events', Icon: EventIcon },
    { path: '/event/create', label: 'Create', Icon: CreateIcon },
    { path: '#about', label: 'About', Icon: InfoIcon },
    { path: '#contact', label: 'Contact', Icon: ContactMailIcon },
  ];

  return (
    <div
      className={`${
        isOpen ? 'w-40' : 'w-14'
      } relative left-0 top-0 h-full bg-[#D8E1E7] shadow-md transition-width duration-300 ease-in-out flex flex-col justify-between`}
      aria-hidden={!isOpen}
    >
      <div>
        {/* <div className="bg-[#00478F] text-white p-2 flex justify-between items-center">
          <button className="ml-2" onClick={() => dispatch(toggleSidebar())}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div> */}
        <ul className="list-none p-4">
          {navItems.map(({ path, label, Icon }) => (
            <li key={path} className="mb-4 flex items-center">
              <NavLink to={path} className={isActive(path) ? 'text-[#FF5D00]' : 'text-[#00478F]'}>
                <Icon />
              </NavLink>
              {isOpen && (
                <NavLink
                  to={path}
                  className={`ml-2 ${isActive(path) ? 'text-[#FF5D00]' : 'text-[#00478F] hover:text-[#2A231F]'}`}
                  onClick={handleCloseSidebar}
                >
                  {label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="bg-[#00478F] text-[#FF5D00] p-2 flex justify-between items-center">
        <LogoutButton />
      </div> */}
    </div>
  );
};

export default Sidebar;
