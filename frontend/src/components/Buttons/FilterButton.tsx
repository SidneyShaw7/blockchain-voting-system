import React from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  isActive: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const FilterButton = ({ onClick, children, isActive, className = '', type = 'button' }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-block shrink-0 border border-[#00478F] bg-transparent px-2 py-2 text-m font-medium text-[#00478F] transition hover:bg-transparent hover:text-[#3375ff] hover:border-[#3375ff] focus:outline-none focus:shadow-[0px_3px_0px_0px_rgba(116,189,203)] active:text-[#74BDCB] shadow-[0px_2px_0px_0px_rgba(116,189,203)] hover:shadow-[0px_3px_0px_0px_rgba(116,189,203)] ${className}`}
    >
      {isActive && <FilterListIcon fontSize="small" />} {children}
    </button>
  );
};

export default FilterButton;
