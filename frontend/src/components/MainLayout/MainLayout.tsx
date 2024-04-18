import React, { ReactNode } from 'react';
import { Sidebar } from '../Sidebar';
import ToggleButton from '../ToggleButton/ToggleButton';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <ToggleButton />
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">{children}</div>
    </div>
  );
};

export default MainLayout;
