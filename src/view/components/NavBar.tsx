import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import ProfileMenu from 'view/components/ProfileMenu';

import { DRAWER_WIDTH } from 'view/components/Sidebar';

export interface NavBarProps {
  onDrawerClick: Function;
  isSidebarOpen?: boolean;
}

export const NAVBAR_HEIGHT = '9.75vh';

const useStyles = makeStyles({
  navbar: {
    height: NAVBAR_HEIGHT,
    backgroundColor: 'white',
    color: 'black',
    transitionProperty: 'width',
    transitionDuration: '.3s',
    transitionTimingFunction: 'ease',
  },
  navBarShift: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transitionProperty: 'width',
    transitionDuration: '.3s',
    transitionTimingFunction: 'ease',
  },
  icon: {
    marginBottom: 10,
  },
  username: {
    marginLeft: 'auto',
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
});

export default function NavBar({ onDrawerClick, isSidebarOpen }: NavBarProps) {
  const classes = useStyles();

  const handleDrawerClick = () => {
    onDrawerClick();
  };

  return (
    <AppBar
      position="fixed"
      className={`${classes.navbar} ${isSidebarOpen && classes.navBarShift}`}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerClick}
          edge="start"
          className={`${classes.menuButton} ${isSidebarOpen && classes.hide}`}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          ConsenSource
        </Typography>
        <ProfileMenu />
      </Toolbar>
    </AppBar>
  );
}
