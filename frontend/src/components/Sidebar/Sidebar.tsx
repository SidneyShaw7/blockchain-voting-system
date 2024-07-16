import { RootState, useDispatch, useSelector } from '../../store';
import { NavLink } from 'react-router-dom';
import { toggleSidebar } from '../../features/sidebar';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import CreateIcon from '@mui/icons-material/Create';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Tooltip from '@mui/material/Tooltip';
import { StyledIconButton } from './styledComponents';

const Sidebar = () => {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const dispatch = useDispatch();

  const navItems = [
    { path: '/home', label: 'Home', Icon: HomeIcon },
    { path: '/events', label: 'Ballots', Icon: EventIcon },
    { path: '/event/create', label: 'Create', Icon: CreateIcon },
    { path: '/about', label: 'About', Icon: InfoIcon },
    { path: '/contact', label: 'Contact', Icon: ContactMailIcon },
  ];

  const isCurrentPage = (path: string) => location.pathname === path;

  return (
    <div
      className={`${
        isOpen ? 'w-48' : 'w-14'
      } relative left-0 top-0 h-full bg-gradient-to-b from-[#D8E1E7] to-transparent shadow-md transition-width duration-300 ease-in-out flex flex-col justify-between`}
      aria-hidden={!isOpen}
    >
      <div>
        <ul className="list-none">
          {navItems.map(({ path, label, Icon }) => (
            <li key={path} className="flex items-center">
              <Tooltip title={label} placement="right">
                <NavLink to={path} className={({ isActive }) => (isActive ? 'text-[#ff6747]' : 'text-[#00478F]')}>
                  <StyledIconButton className={isCurrentPage(path) ? 'active' : ''}>
                    <Icon sx={{ fontSize: 30 }}/>
                  </StyledIconButton>
                </NavLink>
              </Tooltip>
              {isOpen && (
                <NavLink
                  to={path}
                  className={({ isActive }) => `ml-7 ${isActive ? 'text-[#ff6747]' : 'text-[#00478F] hover:text-[#2A231F]'}`}
                  onClick={() => dispatch(toggleSidebar())}
                >
                  {label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
