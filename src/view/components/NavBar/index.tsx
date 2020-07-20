import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import ProfileMenu from 'view/components/NavBar/ProfileMenu';

export const NAVBAR_SPACING_UNITS = 6;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navbar: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    profile: {
      marginLeft: 'auto',
    },
  }),
);

export default function NavBar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.navbar}>
      <Toolbar variant="dense">
        <Typography variant="h5" noWrap>
          ConsenSource
        </Typography>
        <ProfileMenu />
      </Toolbar>
    </AppBar>
  );
}
