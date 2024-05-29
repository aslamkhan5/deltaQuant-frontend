// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#57D57B',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
  typography: {
    h1: {
      fontWeight: 600,
      fontSize: '2.75rem', // 44px, 1rem = 16px
      color: '#F8F8F8',
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#fff', // White color for checkbox in dark mode
        },
      },
    }
  },
});

export default theme;
