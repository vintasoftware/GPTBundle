'use client';

import { ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const MuiThemeWrapper = ({ children }: { children: ReactNode }) => {
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            minWidth: 0, // Disable minimum width for buttons
            textTransform: 'none', // Disable auto-capitalization of button text
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiThemeWrapper;
