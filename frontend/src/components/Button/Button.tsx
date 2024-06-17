import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ onClick, children, className, type = 'button' }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-block shrink-0 rounded-md border border-[#ff6747] bg-[#ff6747] px-3 py-2 text-m font-medium text-white transition hover:bg-[#ff370c] hover:text-white focus:outline-none focus:ring active:text-[#ff370c] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
