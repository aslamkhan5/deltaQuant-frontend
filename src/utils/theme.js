// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode:'dark',
    primary: {
      main: '#57D57B',
    },
    secondary: {
      main: '#FFFFFF',
    },
     // Define text and background colors
     text: {
      primary: '#F8F8F8', // Default text color
    },
    background: {
      default: '#121212', // Default background color
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
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            backgroundColor: 'white',
            borderRadius: 8, // 1 unit typically equals 8px in Material-UI
            color: '#000000',
          },
          // '& .MuiOutlinedInput-root': {
          //   '& fieldset': {
          //     borderColor: 'rgba(0, 0, 0, 0.23)', // default border color, change if necessary
          //   },
          //   '&:hover fieldset': {
          //     borderColor: '#000000', // hover border color
          //   },
          //   '&.Mui-focused fieldset': {
          //     borderColor: '#000000', // focused border color
          //   },
          // },
        },
      },
    },
    MuiTable:{
      styleOverrides: {
        root: {
          width:"100%"
        }
      }
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: '#565555', // Set background color for TableContainer
          padding:24,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        body: { // Targeting table body cells
          color: 'white', // Set text color to #57D57B
          fontWeight:"400",
          fontSize:14,
        },
        head: { // Targeting table header cells
          fontWeight: 'bold', // Set font weight to bold
          fontSize: 16,
        },
      },
    },
  },
});

export default theme;
