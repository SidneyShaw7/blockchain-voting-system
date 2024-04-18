declare module '@heroicons/react/24/outline' {
  import React from 'react';

  export interface IconProps {
    className?: string;
    'aria-hidden'?: boolean;
    style?: React.CSSProperties;
  }

  export const MenuIcon: React.FC<IconProps>;
  export const XIcon: React.FC<IconProps>;
}
