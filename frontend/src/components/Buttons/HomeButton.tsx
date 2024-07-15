import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const HomeButton = ({ onClick, children, className, type = 'button' }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-block shrink-0 rounded-md border border-[#ff6747] bg-[#ff6747] px-9 py-3 text-m font-medium text-white transition hover:bg-transparent hover:text-[#ff6747] focus:outline-none focus:ring active:text-[#00478F] ${className}`}
    >
      {children}
    </button>
  );
};

export default HomeButton;
