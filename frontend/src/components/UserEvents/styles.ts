import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';

// Augment the palette to include an ochre color
declare module '@mui/material/styles' {
  interface Palette {
    deepBlue: Palette['primary'];
  }

  interface PaletteOptions {
    deepBlue?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    deepBlue: true;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: ['Nunito', 'sans-serif'].join(','),
  },
  palette: {
    deepBlue: {
      main: '#00478F',
    },
  },
});

export const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#00478F',
    },
    '&:hover fieldset': {
      borderColor: '#003366',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#002244',
    },
  },
  '& .MuiOutlinedInput-input': {
    '&:focus': {
      outline: 'none !important',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#00478F',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#002244',
  },
});
