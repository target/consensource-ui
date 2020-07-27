import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import { items } from 'view/components/Sidebar/items';
import { useHistory, useLocation } from 'react-router-dom';

const drawerWidth = 100;

const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    marginTop: 50, // "dense" AppBar height
    width: drawerWidth,
  },
  list: {
    paddingTop: 0, // Remove gap between AppBar and first List item
  },
});

export function Sidebar() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  // Track route changes to update the selected sidebar item
  const [curRoute, setCurRoute] = useState(location.pathname);

  const isSelected = (route: string) => curRoute.includes(route);

  const onClick = (route: string) => {
    history.push(route);
    setCurRoute(route);
  };

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <List className={classes.list}>
        {items.map((item, i) =>
          // eslint-disable-next-line react/no-array-index-key
          React.createElement(item, { isSelected, onClick, key: i }),
        )}
      </List>
    </Drawer>
  );
}
