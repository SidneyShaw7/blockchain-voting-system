import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

export const StyledToggleButton = styled(IconButton)<{ active?: boolean }>(() => ({
  marginLeft: '4px',
  color: '#000',
  '&.active': {
    color: '#D01110',
  },
}));

export const StyledIconButton = styled(IconButton)(() => ({
  color: '#000',
  '&.active': {
    color: '#ff6747',
  },
  '&:hover': {
    backgroundColor: 'transparent',
  },
  // '&:focus': {
  //   backgroundColor: 'transparent',
  // },
  '& .MuiTouchRipple-root': {},
  borderRadius: 0,
}));

export const StyledMenuItem = styled(MenuItem)(() => ({
  '&.active': {
    backgroundColor: '#ff6747',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#ff6747',
    },
  },
}));
