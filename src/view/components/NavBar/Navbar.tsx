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
import { LinkWithHistory } from '../LinkWithHistory';

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
    persona: {
      fontWeight: 'lighter',
    },
    divider: {
      backgroundColor: palette.primary.contrastText,
      margin: '0px 5px 0px 5px',
    },
  }),
);

export const BaseNavBar: FC = ({ children: AuthItems }) => {
  const classes = useStyles();

  // TODO: Replace with SVG
  const Logo = () => (
    <div className={classes.logoContainer}>
      <LinkWithHistory to="/">
        <Grid container>
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
      </LinkWithHistory>
    </div>
  );

  return (
    <AppBar position="fixed" className={classes.navbar}>
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
