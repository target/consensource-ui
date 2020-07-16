import { createMuiTheme } from '@material-ui/core/styles';

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
