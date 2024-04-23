import React, { ReactNode } from 'react';
// import { Sidebar } from '../Sidebar';
import { Alert } from '../AlertComponent';
import { Sidebar } from '../Sidebar';
import ToggleButton from '../ToggleButton/ToggleButton';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow p-0">
          <div>
            <p className="text-xl font-bold">
              <ToggleButton />
            </p>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4">
          <Alert />
          <div>{children}</div>
        </main>
        <footer className="bg-white shadow p-2 text-center">
          {/* footer info, links, social media icons */}
          {/* <p>© 2024 Secure Voting System. All rights reserved.</p> */}
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
