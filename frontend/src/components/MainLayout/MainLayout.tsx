import React, { ReactNode } from 'react';
import { Sidebar } from '../Sidebar';
import { Alert } from '../AlertComponents';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Alert />
      <Sidebar />
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
