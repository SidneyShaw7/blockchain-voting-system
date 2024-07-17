import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const GreenButton = ({ onClick, children, className, type = 'button' }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-block shrink-0 rounded-sm border border-[#59981A] bg-[#81B622] px-6 py-2 text-m font-medium text-white transition hover:bg-[#59981A] hover:text-white hover:border-[#59981A] focus:outline-none focus:ring active:text-white shadow-[2px_2px_0px_0px_rgba(61,85,12)] hover:shadow-[3px_3px_0px_0px_rgba(61,85,12)] ${className}`}
    >
      {children}
    </button>
  );
};

export default GreenButton;
