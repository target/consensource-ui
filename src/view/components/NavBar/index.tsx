import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { ProfileMenu } from 'view/components/NavBar/ProfileMenu';
import { Link } from 'react-router-dom';

export const NAVBAR_SPACING_UNITS = 5;

const useStyles = makeStyles(({ palette, zIndex }: Theme) =>
  createStyles({
    navbar: {
      backgroundColor: palette.primary.main,
      color: palette.primary.contrastText,
      zIndex: zIndex.drawer + 1,
    },
    profile: {
      marginLeft: 'auto',
    },
    link: {
      textDecoration: 'none',
      color: 'white',
    },
  }),
);

export function NavBar() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.navbar}>
      <Toolbar variant="dense">
        <Link to="/dashboard" className={classes.link}>
          <Typography variant="h5" noWrap>
            ConsenSource
          </Typography>
        </Link>

        <ProfileMenu />
      </Toolbar>
    </AppBar>
  );
}
