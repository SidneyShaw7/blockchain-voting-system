import { ReactNode } from 'react';
import { Alert } from '../AlertComponent';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div>
      <Alert />
      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
