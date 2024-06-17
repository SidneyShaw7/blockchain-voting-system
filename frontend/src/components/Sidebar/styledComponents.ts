// import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

// export const StyledToggleButton = styled(IconButton)<{ active?: boolean }>(() => ({
//   marginLeft: '5px',
//   color: '#000',
//   '&.active': {
//     color: '#D01110',
//   },
// }));

export const StyledIconButton = styled(IconButton)(() => ({
  margin: '4px',
  color: '#00478F',
  '&.active': {
    color: '#ff6747',
  },
}));
