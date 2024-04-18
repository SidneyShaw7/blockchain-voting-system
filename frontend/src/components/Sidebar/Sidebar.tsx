import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../features/sidebar/sidebarSlice';
import { RootState } from '../../app/store';

const Sidebar: React.FC = () => {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const dispatch = useDispatch();

  return (
    <div
      className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                  fixed left-0 top-0 w-64 h-full bg-gray-200 shadow-md 
                  transition-transform duration-300 ease-in-out`}
      aria-hidden={!isOpen}
    >
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded m-4"
        aria-expanded={isOpen}
      >
        {isOpen ? 'Close' : 'Open'} Sidebar
      </button>
      <ul className="list-none p-4">
        <li className="mb-4">
          <a href="#home" className="text-blue-500 hover:text-blue-700">
            Home
          </a>
        </li>
        <li className="mb-4">
          <a href="#services" className="text-blue-500 hover:text-blue-700">
            Services
          </a>
        </li>
        <li className="mb-4">
          <a href="#about" className="text-blue-500 hover:text-blue-700">
            About
          </a>
        </li>
        <li className="mb-4">
          <a href="#contact" className="text-blue-500 hover:text-blue-700">
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
