import { createTheme } from '@mui/material/styles';

const themeOptions = {
    palette: {
      type: 'light',
      primary: {
        main: '#626E60',
      },
      secondary: {
        main: '#626e60',
      },
      error: {
        main: '#AF473C',
      },
      warning: {
        main: '#E8B172',
      },
    },
  };

  export const Theme = createTheme(themeOptions);