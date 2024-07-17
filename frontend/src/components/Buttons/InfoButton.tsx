import React from 'react';
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const InfoButton = ({ onClick, children, className, type = 'button' }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-block shrink-0 rounded-sm border border-transparent bg-transparent px-2 py-2 text-m font-medium text-[#ff6747] transition hover:bg-transparent hover:text-[#3375ff] hover:border-transparent focus:outline-none focus:ring active:text-[#74BDCB] underline ${className}`}
    >
      {children}
    </button>
  );
};

export default InfoButton;
