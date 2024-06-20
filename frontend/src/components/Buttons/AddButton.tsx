import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const AddButton = ({ onClick, children, className, type = 'button' }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-block shrink-0 rounded-md border border-[#EFE7BC] bg-[#ff6747] px-3 py-2 text-m font-medium text-[#E7F2F8] transition hover:bg-[#F54D3D] hover:text-[#E7F2F8] focus:outline-none focus:ring active:text-[#ff370c] shadow-[2px_2px_0px_0px_rgba(116,189,203)] hover:shadow-[3px_3px_0px_0px_rgba(116,189,203)] ${className}`}
    >
      {children}
    </button>
  );
};

export default AddButton;
