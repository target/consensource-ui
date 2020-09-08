import React, { FC } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ProfileMenu } from './ProfileMenu';
import { NavbarLink } from './NavbarLink';

const useStyles = makeStyles(({ palette, zIndex }: Theme) =>
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
      color: 'white',
      display: 'inline-block',
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
  return (
    <BaseNavBar>
      <ProfileMenu />
    </BaseNavBar>
  );
};
