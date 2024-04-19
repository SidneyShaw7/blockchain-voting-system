import React from 'react';
import { useSelector } from 'react-redux';
// import { toggleSidebar } from '../../features/sidebar/sidebarSlice';
// import ToggleButton from '../ToggleButton/ToggleButton';
import { RootState } from '../../app/store';
import { useState } from 'react';

const Sidebar: React.FC = () => {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const [isEventsOpen, setEventsOpen] = useState(false); // State to toggle events sub-menu


  return (
    <div
      className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} 
      fixed left-0 top-0 w-60 h-full bg-[#D8E1E7] shadow-md 
      transition-transform duration-300 ease-in-out`}
      aria-hidden={!isOpen}
    >
      <div className="bg-[#00478F] text-white p-5 flex justify-between items-center"></div>
      <ul className="list-none p-4">
        <li className="mb-4">
          <a href="/" className="text-[#00478F] hover:text-[#2A231F]">
            Home
          </a>
        </li>
        <li className="mb-4">
          <button
            onClick={() => setEventsOpen(!isEventsOpen)}
            className="text-[#00478F] hover:text-[#2A231F] focus:outline-none"
            aria-expanded={isEventsOpen}
          >
            My Events
          </button>
          <div className={`overflow-hidden transition-height duration-700 ease-in-out ${isEventsOpen ? 'max-h-40' : 'max-h-0'}`}>
            <ul className="list-none pl-4">
              <li className="mb-2 mt-3">
                <a href="#voteInitiatives" className="text-[#00478F] hover:text-[#2A231F]">
                  Vote Initiatives
                </a>
              </li>
              <li>
                <a href="#votingBooth" className="text-[#00478F] hover:text-[#2A231F]">
                  Voting Booth
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-4">
          <a href="#about" className="text-[#00478F] hover:text-[#2A231F]">
            Create Event
          </a>
        </li>
        <li className="mb-4">
          <a href="#about" className="text-[#00478F] hover:text-[#2A231F]">
            About
          </a>
        </li>
        <li className="mb-4">
          <a href="#contact" className="text-[#00478F] hover:text-[#2A231F]">
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
