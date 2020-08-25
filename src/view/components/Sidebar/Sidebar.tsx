import React from 'react';
import { Drawer, List } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { sidebarItems } from './items';

const drawerWidth = 240;

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      marginTop: 45, // "dense" Toolbar height
      width: drawerWidth,
      backgroundColor: palette.grey['100'],
    },
    list: {
      paddingTop: 0, // Remove gap between AppBar and first List item
    },
  }),
);

export const Sidebar = () => {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <List className={classes.list}>{React.createElement(sidebarItems)}</List>
    </Drawer>
  );
};
