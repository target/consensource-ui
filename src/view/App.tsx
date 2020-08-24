import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { theme } from 'config/theme';
import { stores } from 'stores';
import { StoresContext } from 'view/context';
import { Layout } from 'view/components/Layout';

export const App = () => {
  return (
    <StoresContext.Provider value={stores}>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </StoresContext.Provider>
  );
};
