import React, { FC } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { StylesProvider, StylesOptions } from '@material-ui/styles/';
import { theme } from 'config/theme';

const generateClassName: StylesOptions['generateClassName'] = (
  rule,
  sheet,
): string => `${sheet!.options.classNamePrefix}-${rule.key}`;

export const TestThemeProvider: FC = ({ children }) => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </StylesProvider>
  );
};
