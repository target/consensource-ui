import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#CC0000', // Target Red
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#366CD9',
      contrastText: '#ffffff',
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
