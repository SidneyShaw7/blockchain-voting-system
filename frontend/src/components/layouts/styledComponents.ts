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
    color: '#FF5D00',
  },
}));

export const StyledMenuItem = styled(MenuItem)(() => ({
  '&.active': {
    backgroundColor: '#FF5D00',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#FF5D00',
    },
  },
}));
