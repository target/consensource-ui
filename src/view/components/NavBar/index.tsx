import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { ProfileMenu } from 'view/components/NavBar/ProfileMenu';
import { Link } from 'react-router-dom';
import stores from 'stores';

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
  const { isAuthenticated } = stores.userStore;

  return (
    <AppBar position="fixed" className={classes.navbar}>
      <Toolbar variant="dense">
        <Link to="/" className={classes.link}>
          <Typography variant="h5" noWrap>
            ConsenSource
          </Typography>
        </Link>

        {isAuthenticated && <ProfileMenu />}
      </Toolbar>
    </AppBar>
  );
}
