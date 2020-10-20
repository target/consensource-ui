import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { StoresContext } from 'view/context';
import { stores } from 'stores';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TestThemeProvider } from './testThemeProvider';

const wrapper = ({ children }: any) => {
  return (
    <CssBaseline>
      <StoresContext.Provider value={stores}>
        <TestThemeProvider>
          <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
        </TestThemeProvider>
      </StoresContext.Provider>
    </CssBaseline>
  );
};

const customRender = (ui: any, options?: any) =>
  render(ui, { wrapper, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
