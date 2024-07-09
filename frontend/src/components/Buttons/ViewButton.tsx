import React from 'react';
// import VisibilityIcon from '@mui/icons-material/Visibility';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const ViewButton = ({ onClick, children, className, type = 'button' }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-block shrink-0 rounded-md border border-[#00478F] bg-transparent px-2 py-2 text-m font-medium text-[#00478F] transition hover:bg-transparent hover:text-[#3375ff] hover:border-[#3375ff] focus:outline-none focus:ring active:text-[#74BDCB] shadow-[2px_2px_0px_0px_rgba(116,189,203)] hover:shadow-[3px_3px_0px_0px_rgba(116,189,203)] ${className}`}
    >
      {children}
    </button>
  );
};

export default ViewButton;
