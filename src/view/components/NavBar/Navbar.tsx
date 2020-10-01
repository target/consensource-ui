import React, { FC } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Divider,
  createStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ProfileMenu } from './ProfileMenu';
import { NavbarLink } from './NavbarLink';

// Height of a "dense" toolbar
export const NAVBAR_HEIGHT = 48;

const useStyles = makeStyles(({ palette, zIndex }) =>
  createStyles({
    navbar: {
      backgroundColor: palette.primary.main,
      color: palette.primary.contrastText,
      zIndex: zIndex.drawer + 1,
    },
    logoContainer: {
      flexGrow: 1,
    },
    navbarText: {
      textDecoration: 'none',
      color: palette.primary.contrastText,
      display: 'inline-block',
    },
    divider: {
      backgroundColor: palette.primary.contrastText,
      margin: '5px 10px 5px 0px',
    },
  }),
);

export const BaseNavBar: FC = ({ children: AuthItems }) => {
  const classes = useStyles();

  // TODO: Replace with SVG
  const Logo = () => (
    <div className={classes.logoContainer}>
      <Link to="/" className={classes.navbarText}>
        <Typography variant="h5" noWrap>
          ConsenSource
        </Typography>
      </Link>
    </div>
  );

  return (
    <AppBar position="fixed" className={classes.navbar}>
      <Toolbar variant="dense">
        {/* Note that all items after <Logo /> will be on the right side
        of the NavBar due to the `flexGrow: 1` styling */}
        <Logo />
        <NavbarLink label="Search Factories" route="/search" />
        {AuthItems}
      </Toolbar>
    </AppBar>
  );
};

export const UnauthedNavBar = () => {
  return (
    <BaseNavBar>
      <NavbarLink label="Login" route="/login" />
    </BaseNavBar>
  );
};

export const AuthedNavBar = () => {
  const classes = useStyles();

  return (
    <BaseNavBar>
      <Divider orientation="vertical" className={classes.divider} flexItem />
      <ProfileMenu />
    </BaseNavBar>
  );
};
