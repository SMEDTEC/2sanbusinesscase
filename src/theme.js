import { createTheme } from '@mui/material/styles';

// Colors based on the 2san branding image
const primaryDarkBlue = '#101A2B'; // For header/appBar
const buttonBlue = '#3A4A7D';      // For primary buttons
const contentBoxBlue = '#2C3E50';  // For content areas like the "IS" box, or card headers
const lightBlueBackground = '#DDE5ED';// Main background, lighter shade
const accentLightBlue = '#A0B3C7'; // Accent, from the background pattern elements
const whiteColor = '#FFFFFF';
const darkTextColor = '#333333';
const mediumTextColor = '#555555';

const theme = createTheme({
  palette: {
    primary: {
      main: buttonBlue, // Primary actions, buttons
    },
    secondary: {
      main: accentLightBlue, // Accent color
    },
    background: {
      default: lightBlueBackground,
      paper: whiteColor,
    },
    text: {
      primary: darkTextColor,
      secondary: mediumTextColor,
      light: whiteColor, // For text on dark backgrounds
    },
    // Custom colors for specific components if needed
    appBar: {
      background: primaryDarkBlue,
      text: whiteColor,
    },
    contentBox: {
      background: contentBoxBlue,
      text: whiteColor,
    },
    // Adding a common success/error/warning for consistency
    success: {
      main: '#4CAF50',
    },
    error: {
      main: '#F44336',
    },
    warning: {
      main: '#FF9800',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      color: contentBoxBlue,
      fontWeight: 500,
    },
    h5: {
      color: contentBoxBlue,
      fontWeight: 500,
    },
    h6: {
      color: contentBoxBlue,
      fontWeight: 500,
    },
    // Ensure body text on dark backgrounds is light
    body1: {
      // Default is darkTextColor, will need context-based overrides or specific components
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: primaryDarkBlue,
          color: whiteColor,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: buttonBlue,
          color: whiteColor,
          '&:hover': {
            backgroundColor: '#2E3B66', // Darken buttonBlue on hover
          },
        },
        containedSecondary: {
          backgroundColor: accentLightBlue,
          color: darkTextColor,
          '&:hover': {
            backgroundColor: '#8FA4B3', // Darken accentLightBlue on hover
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          // Example: Add a subtle shadow or border if desired
          // border: `1px solid ${accentLightBlue}`,
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // Ensure paper components have a consistent background
        }
      }
    }
  },
});

export default theme;
