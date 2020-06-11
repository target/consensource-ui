import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

export interface SidebarProps {
  onDrawerClick: Function;
  isSidebarOpen: boolean;
}

export const DRAWER_WIDTH = 240;

const useStyles = makeStyles({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    zIndex: 1,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
  },
  drawerOpen: {
    width: DRAWER_WIDTH,
    transitionProperty: 'width',
    transitionDuration: '.3s',
    transitionTimingFunction: 'ease',
  },
  drawerClose: {
    transitionProperty: 'width',
    transitionDuration: '.3s',
    transitionTimingFunction: 'ease',
    overflowX: 'hidden',
    width: 60,
  },
});

export default function Sidebar({
  onDrawerClick,
  isSidebarOpen,
}: SidebarProps) {
  const classes = useStyles();
  const history = useHistory();

  const onClick = () => {
    onDrawerClick();
  };

  return (
    <Drawer
      variant="permanent"
      className={`${classes.drawer} ${
        isSidebarOpen ? classes.drawerOpen : classes.drawerClose
      }`}
      classes={{
        paper: `${isSidebarOpen ? classes.drawerOpen : classes.drawerClose}`,
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={onClick}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem
          button
          key="dashboard"
          onClick={() => history.push('dashboard')}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button key="search" onClick={() => history.push('search')}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search Factories" />
        </ListItem>

        <ListItem button key="email" onClick={() => history.push('email')}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Email Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
}
