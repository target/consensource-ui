import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import { NAVBAR_HEIGHT } from 'view/components/NavBar';
import { theme } from 'view/theme';
import { items } from 'view/components/Sidebar/items';
import { useHistory, useLocation } from 'react-router-dom';

export const SIDEBAR_SPACING_UNITS = 11;

const useStyles = makeStyles({
  drawer: {
    width: theme.spacing(SIDEBAR_SPACING_UNITS),
    marginTop: NAVBAR_HEIGHT,
    zIndex: 0,
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
      <List>
        {items.map((item) =>
          React.createElement(item, { isSelected, onClick }),
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
