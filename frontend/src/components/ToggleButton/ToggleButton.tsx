import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../features/sidebar';
import { MenuIcon, XIcon } from '@heroicons/react/24/outline';
import { RootState } from '../../app/store';

const ToggleButton: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  return (
    <div className="fixed top-5 left-5 z-50">
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="p-3 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 rounded-full transition duration-300 ease-in-out"
        aria-expanded={isOpen}
        aria-controls="sidebar"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      >
        {isOpen ? <XIcon className="h-6 w-6" aria-hidden={true} /> : <MenuIcon className="h-6 w-6" aria-hidden={true} />}
      </button>
    </div>
  );
};

export default ToggleButton;
