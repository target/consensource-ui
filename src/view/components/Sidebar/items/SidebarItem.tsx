import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  ListItem,
  ListItemText,
  Typography,
  ListItemIcon,
} from '@material-ui/core';

export interface SidebarItemProps {
  lastItem?: boolean;
  route: string;
  icon: JSX.Element;
  label: string;
}

const useStyles = makeStyles(
  createStyles({
    listItem: {
      height: 65,
    },
  }),
);

export const SidebarItem = ({
  lastItem,
  route,
  icon,
  label,
}: SidebarItemProps) => {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();

  // Track route changes to update the selected sidebar item
  const [curRoute, setCurRoute] = useState(pathname);

  const isSelected =
    route === '/' ? curRoute === '/' : curRoute.includes(route);

  useEffect(() => {
    setCurRoute(pathname);
  }, [pathname]);

  const onClick = () => {
    history.push(route);
  };

  return (
    <ListItem
      button
      divider={!lastItem}
      selected={isSelected}
      onClick={onClick}
      className={classes.listItem}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>
        <Typography variant="button">{label}</Typography>
      </ListItemText>
    </ListItem>
  );
};
