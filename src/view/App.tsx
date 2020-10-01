import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { theme } from 'config/theme';
import { stores } from 'stores';
import { StoresContext } from 'view/context';
import { Layout } from 'view/components/Layout';
import CssBaseline from '@material-ui/core/CssBaseline';

export const App = () => {
  return (
    <CssBaseline>
      <StoresContext.Provider value={stores}>
        <ThemeProvider theme={theme}>
          <Layout />
        </ThemeProvider>
      </StoresContext.Provider>
    </CssBaseline>
  );
};
