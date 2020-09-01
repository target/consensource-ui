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
import { SearchFactoriesNavLink } from './SearchFactoriesNavLink';

const useStyles = makeStyles(({ palette, zIndex }: Theme) =>
  createStyles({
    navbar: {
      backgroundColor: palette.primary.main,
      color: palette.primary.contrastText,
      zIndex: zIndex.drawer + 1,
    },
    logo: {
      textDecoration: 'none',
      color: 'white',
      flexGrow: 1,
    },
  }),
);

export const BaseNavBar: FC = ({ children: AuthItems }) => {
  const classes = useStyles();

  // TODO: Replace with SVG
  const Logo = () => (
    <Link to="/" className={classes.logo}>
      <Typography variant="h5" noWrap>
        ConsenSource
      </Typography>
    </Link>
  );

  return (
    <AppBar position="fixed" className={classes.navbar}>
      <Toolbar variant="dense">
        {/* Note that all items after <Logo /> will be on the right side
        of the NavBar due to the `flexGrow: 1` styling */}
        <Logo />
        <SearchFactoriesNavLink />
        {AuthItems}
      </Toolbar>
    </AppBar>
  );
};

export const AuthedNavBar = () => {
  return (
    <BaseNavBar>
      <ProfileMenu />
    </BaseNavBar>
  );
};
