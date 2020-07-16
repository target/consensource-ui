import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import ProfileMenu from 'view/components/NavBar/ProfileMenu';

export const NAVBAR_HEIGHT = '9.75vh';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navbar: {
      height: NAVBAR_HEIGHT,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    appName: {
      paddingLeft: theme.spacing(3),
    },
    profile: {
      marginLeft: 'auto',
      paddingRight: theme.spacing(3),
    },
  }),
);

export default function NavBar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.navbar}>
      <Toolbar>
        <Typography className={classes.appName} variant="h5" noWrap>
          ConsenSource
        </Typography>
        <ProfileMenu />
      </Toolbar>
    </AppBar>
  );
}
