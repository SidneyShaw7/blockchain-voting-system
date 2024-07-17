import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const DeleteButton = ({ onClick, children, className, type = 'button' }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-block shrink-0 rounded-sm border border-transparent bg-transparent px-2 py-2 text-sm font-medium text-[#00478F] transition hover:bg-transparent hover:text-[#A30000] hover:border-transparent focus:outline-none focus:ring active:text-[#74BDCB] underline ${className}`}
    >
      <DeleteOutlineIcon fontSize="small" /> {children}
    </button>
  );
};

export default DeleteButton;
