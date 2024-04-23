import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useState } from 'react';
import { LogoutButton } from '../LogoutButton';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../features/sidebar';

const Sidebar: React.FC = () => {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  const [isEventsOpen, setEventsOpen] = useState(false);

  const handleCloseSidebar = () => {
    if (isOpen) {
      dispatch(toggleSidebar());
    }
  };

  return (
    <div
      className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} 
      fixed left-0 top-0 w-60 h-full bg-[#D8E1E7] shadow-md 
      transition-transform duration-300 ease-in-out flex flex-col justify-between`}
      aria-hidden={!isOpen}
    >
      <div>
        <div className="bg-[#00478F] text-white p-5 flex justify-between items-center"></div>
        <ul className="list-none p-4">
          <li className="mb-4">
            <a href="/" className="text-[#00478F] hover:text-[#2A231F]" onClick={handleCloseSidebar}>
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
            <div
              className={`overflow-hidden transition-height duration-700 ease-in-out ${isEventsOpen ? 'max-h-40' : 'max-h-0'}`}
            >
              <ul className="list-none pl-4">
                <li className="mb-2 mt-3">
                  <a href="/#voteInitiatives/" className="text-[#00478F] hover:text-[#2A231F]" onClick={handleCloseSidebar}>
                    Vote Initiatives
                  </a>
                </li>
                <li>
                  <a href="#votingBooth" className="text-[#00478F] hover:text-[#2A231F]" onClick={handleCloseSidebar}>
                    Voting Booth
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="mb-4">
            <a href="/createevent" className="text-[#00478F] hover:text-[#2A231F]" onClick={handleCloseSidebar}>
              Create Event
            </a>
          </li>
          <li className="mb-4">
            <a href="#about" className="text-[#00478F] hover:text-[#2A231F]" onClick={handleCloseSidebar}>
              About
            </a>
          </li>
          <li className="mb-4">
            <a href="#contact" className="text-[#00478F] hover:text-[#2A231F]" onClick={handleCloseSidebar}>
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className="bg-[#00478F] text-[#FF5D00] p-2 flex justify-between items-center">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
