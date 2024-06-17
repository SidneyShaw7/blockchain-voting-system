import React from 'react';
import UndoIcon from '@mui/icons-material/Undo';
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const CancelButton = ({ onClick, children, className, type = 'button' }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-block shrink-0 rounded-md border border-transparent bg-transparent px-2 py-2 text-m font-medium text-[#00478F] transition hover:bg-transparent hover:text-[#3375ff] hover:border-transparent focus:outline-none focus:ring active:text-[#74BDCB] underline ${className}`}
    >
      <UndoIcon fontSize="small" /> {children}
    </button>
  );
};

export default CancelButton;
