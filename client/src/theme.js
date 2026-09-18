import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4338ca',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#06b6d4',
      light: '#38bdf8',
      dark: '#0e7490',
      contrastText: '#ffffff',
    },
    accent: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    background: {
      default: '#070b14',
      paper: '#111827',
      subtle: '#182235',
      elevated: '#1e293b',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
      disabled: '#64748b',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Outfit", "Inter", sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontFamily: '"Outfit", "Inter", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily: '"Outfit", "Inter", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.015em',
    },
    h4: {
      fontFamily: '"Outfit", "Inter", sans-serif',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontFamily: '"Outfit", "Inter", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Outfit", "Inter", sans-serif',
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '1.05rem',
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '0.975rem',
      lineHeight: 1.7,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#070b14',
          color: '#f8fafc',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#070b14',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#1e293b',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#334155',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '8px 20px',
          boxShadow: 'none',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
            boxShadow: '0 6px 20px rgba(99, 102, 241, 0.5)',
            transform: 'translateY(-1px)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
          boxShadow: '0 4px 14px 0 rgba(6, 182, 212, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)',
            boxShadow: '0 6px 20px rgba(6, 182, 212, 0.5)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.15)',
          '&:hover': {
            borderColor: '#818cf8',
            backgroundColor: 'rgba(99, 102, 241, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(17, 24, 39, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 16,
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
          '&:hover': {
            borderColor: 'rgba(99, 102, 241, 0.3)',
            boxShadow: '0 12px 38px 0 rgba(0, 0, 0, 0.45)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.12)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.25)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#6366f1',
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0f172a',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 16,
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.7)',
        },
      },
    },
  },
});

export default theme;
