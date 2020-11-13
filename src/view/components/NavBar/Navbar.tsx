import React, { FC } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Divider,
  Grid,
  createStyles,
} from '@material-ui/core';
import { ProfileMenu } from './ProfileMenu';
import { NavbarLink } from './NavbarLink';
import { UnstyledLink } from '../Links/UnstyledLink';

// Height of a "dense" toolbar
export const NAVBAR_HEIGHT = 48;

const useStyles = makeStyles(({ palette, zIndex }) =>
  createStyles({
    navbar: {
      zIndex: zIndex.drawer + 1,
    },
    logoContainer: {
      flexGrow: 1,
    },
    persona: {
      fontWeight: 'lighter',
    },
    divider: {
      backgroundColor: palette.primary.contrastText,
    },
    authItemsPadding: {
      paddingRight: 10,
    },
  }),
);

export const BaseNavBar: FC = ({ children: AuthItems }) => {
  const classes = useStyles();

  // TODO: Replace with SVG
  const Logo = () => (
    <div className={classes.logoContainer}>
      <UnstyledLink to="/">
        <Grid container spacing={1}>
          <Grid item>
            <Typography variant="h5">ConsenSource</Typography>
          </Grid>
          <Grid item>
            <Divider orientation="vertical" className={classes.divider} />
          </Grid>
          <Grid item>
            <Typography variant="h6" className={classes.persona}>
              Retailer
            </Typography>
          </Grid>
        </Grid>
      </UnstyledLink>
    </div>
  );

  return (
    <AppBar position="fixed" color="primary" className={classes.navbar}>
      <Toolbar variant="dense">
        {/* Note that all items after <Logo /> will be on the right side
        of the NavBar due to the `flexGrow: 1` styling */}
        <Logo />
        <NavbarLink label="About" route="http://consensource.io" openInNewTab />
        <NavbarLink label="Search Factories" route="/search" />
        {AuthItems}
      </Toolbar>
    </AppBar>
  );
};

export const UnauthedNavbar = () => {
  return (
    <BaseNavBar>
      <NavbarLink label="Login" route="/login" />
    </BaseNavBar>
  );
};

export const AuthedNavbar = () => {
  return (
    <BaseNavBar>
      <ProfileMenu />
    </BaseNavBar>
  );
};
