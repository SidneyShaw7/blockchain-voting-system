import React from 'react';

interface DisabledButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled: boolean;
}

const DisabledButton = ({ onClick, children, className, type = 'button', disabled }: DisabledButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-block shrink-0 rounded-sm border border-[#EFE7BC] bg-[#ff6747] px-3 py-2 text-m font-medium text-[#E7F2F8] transition ${
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:bg-[#F54D3D] hover:text-[#E7F2F8] focus:outline-none focus:ring active:text-[#ff370c] shadow-[2px_2px_0px_0px_rgba(116,189,203)] hover:shadow-[3px_3px_0px_0px_rgba(116,189,203)]'
      } ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default DisabledButton;
