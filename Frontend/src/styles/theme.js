import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: '#fff',
    },
    dashboard: {
      main: '#2196f3',
      light: '#bbdefb',
      dark: '#1976d2',
    },
    inventory: {
      main: '#4caf50',
      light: '#c8e6c9',
      dark: '#388e3c',
    },
    menu: {
      main: '#ff9800',
      light: '#ffe0b2',
      dark: '#f57c00',
    },
    waste: {
      main: '#f44336',
      light: '#ffcdd2',
      dark: '#d32f2f',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

export const categoryStyles = {
  dashboard: {
    gradientBg: 'linear-gradient(45deg, #2196f3 30%, #64b5f6 90%)',
    icon: '#2196f3',
  },
  inventory: {
    gradientBg: 'linear-gradient(45deg, #4caf50 30%, #81c784 90%)',
    icon: '#4caf50',
  },
  menu: {
    gradientBg: 'linear-gradient(45deg, #ff9800 30%, #ffb74d 90%)',
    icon: '#ff9800',
  },
  waste: {
    gradientBg: 'linear-gradient(45deg, #f44336 30%, #e57373 90%)',
    icon: '#f44336',
  },
}; 