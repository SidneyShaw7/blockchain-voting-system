import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const SignInUpButton = ({ onClick, children, className, type = 'button' }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-block shrink-0 rounded-sm border border-[#74BDCB] bg-[#74BDCB] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#00478F] hover:border-[#00478F] focus:outline-none focus:ring active:text-[#00478F] ${className}`}
    >
      {children}
    </button>
  );
};

export default SignInUpButton;
