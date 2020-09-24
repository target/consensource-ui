import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#CC0000', // Target Red
      light: '#ea9595',
    },
    secondary: {
      main: '#366CD9',
    },
    error: {
      main: '#B85300',
    },
    warning: {
      main: '#FDE30B',
    },
    success: {
      main: '#008300',
    },
  },
});
