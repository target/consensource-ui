import React, { useState, useEffect } from 'react';
import { Drawer, List } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { items } from 'view/components/Sidebar/items';
import { useHistory, useLocation } from 'react-router-dom';

const drawerWidth = 100;

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      marginTop: 45, // "dense" AppBar height minus 5
      width: drawerWidth,
      backgroundColor: palette.grey['100'],
    },
    list: {
      paddingTop: 0, // Remove gap between AppBar and first List item
    },
  }),
);

export function Sidebar() {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();

  // Track route changes to update the selected sidebar item
  const [curRoute, setCurRoute] = useState(pathname);

  const isSelected = (route: string) => {
    if (route === '/') {
      return curRoute === '/';
    }

    return curRoute.includes(route);
  };

  useEffect(() => {
    setCurRoute(pathname);
  }, [pathname]);

  const onClick = (route: string) => {
    history.push(route);
  };

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <List className={classes.list}>
        {items.map(([route, component], i) =>
          // eslint-disable-next-line react/no-array-index-key
          // TODO: Add a divider to every item except the last one
          React.createElement(component, {
            isSelected: isSelected(route),
            onClick,
            route,
            key: route,
          }),
        )}
      </List>
    </Drawer>
  );
}
