import React, { ReactNode } from 'react';
import { Alert } from '../AlertComponent';

interface AuthLayout {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayout> = ({ children }) => {
  return (
    <div>
      <Alert />
      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;