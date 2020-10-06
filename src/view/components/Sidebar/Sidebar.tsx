import React, { createElement } from 'react';
import { Drawer, List, makeStyles, createStyles } from '@material-ui/core';
import { sidebarItems } from './items';

const drawerWidth = 200;

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      marginTop: 45, // "dense" Toolbar height
      width: drawerWidth,
      backgroundColor: palette.grey['200'],
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
      elevation={20}
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <List className={classes.list}>{createElement(sidebarItems)}</List>
    </Drawer>
  );
};
