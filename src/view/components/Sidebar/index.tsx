import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import { items } from 'view/components/Sidebar/items';
import { useHistory, useLocation } from 'react-router-dom';

export const SIDEBAR_SPACING_UNITS = 12.5;

const useStyles = makeStyles({
  drawer: {
    marginTop: 50, // "dense" AppBar height
    zIndex: 0,
  },
  list: {
    paddingTop: 0, // Remove gap between AppBar and first List item
  },
});

const Sidebar = () => {
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
    <Drawer variant="permanent" classes={{ paper: classes.drawer }}>
      <List className={classes.list}>
        {items.map((item) =>
          React.createElement(item, { isSelected, onClick }),
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
