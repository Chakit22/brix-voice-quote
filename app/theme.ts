'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8B5CF6',
      light: '#A78BFA',
      dark: '#6D28D9',
    },
    secondary: {
      main: '#C084FC',
      light: '#D8B4FE',
      dark: '#9333EA',
    },
    error: {
      main: '#EF4444',
    },
    warning: {
      main: '#F59E0B',
    },
    success: {
      main: '#10B981',
    },
    background: {
      default: '#09090B',
      paper: '#0F0F14',
    },
    text: {
      primary: '#FAFAFA',
      secondary: '#71717A',
    },
    divider: 'rgba(139, 92, 246, 0.12)',
  },
  typography: {
    fontFamily: '"DM Sans", "Satoshi", "Helvetica Neue", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.03em',
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    body1: {
      lineHeight: 1.7,
    },
    body2: {
      lineHeight: 1.6,
    },
    overline: {
      letterSpacing: '0.15em',
      fontSize: '0.7rem',
    },
    caption: {
      fontSize: '0.75rem',
      letterSpacing: '0.04em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(15, 15, 20, 0.6)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(139, 92, 246, 0.1)',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            borderColor: 'rgba(139, 92, 246, 0.25)',
            boxShadow: '0 0 40px rgba(139, 92, 246, 0.06)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(15, 15, 20, 0.6)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(139, 92, 246, 0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 8,
          transition: 'all 0.2s ease',
        },
        outlined: {
          borderColor: 'rgba(139, 92, 246, 0.25)',
          '&:hover': {
            borderColor: 'rgba(139, 92, 246, 0.5)',
            backgroundColor: 'rgba(139, 92, 246, 0.08)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
          padding: '10px 24px',
          transition: 'all 0.2s ease',
        },
        contained: {
          background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
          boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
            boxShadow: '0 6px 28px rgba(139, 92, 246, 0.4)',
          },
        },
        outlined: {
          borderColor: 'rgba(139, 92, 246, 0.4)',
          color: '#A78BFA',
          '&:hover': {
            borderColor: '#8B5CF6',
            backgroundColor: 'rgba(139, 92, 246, 0.08)',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(139, 92, 246, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(139, 92, 246, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(139, 92, 246, 0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#8B5CF6',
            },
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(9, 9, 11, 0.8)',
          backdropFilter: 'blur(16px)',
        },
      },
    },
  },
});

export default theme;
