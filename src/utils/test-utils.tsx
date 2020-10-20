import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { StoresContext } from 'view/context';
import { stores } from 'stores';
import { theme } from 'config/theme';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

const wrapper = ({ children }: any) => {
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <StoresContext.Provider value={stores}>
          <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
        </StoresContext.Provider>
      </ThemeProvider>
    </CssBaseline>
  );
};

const customRender = (ui: any, options?: any) =>
  render(ui, { wrapper, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
