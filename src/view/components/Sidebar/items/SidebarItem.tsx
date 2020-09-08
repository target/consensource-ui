import React from 'react';
import { Link } from 'react-router-dom';
import { useSelectedRoute } from 'services/hooks';
import {
  ListItem,
  ListItemText,
  Typography,
  ListItemIcon,
  makeStyles,
  createStyles,
} from '@material-ui/core';

export interface SidebarItemProps {
  /**
   * If passed, the item will not have a divider on the bottom
   */
  lastItem?: boolean;
  /**
   * Route that the user will be redirected to when clicking
   * on the item
   */
  route: string;
  /**
   * Icon that will be displayed to the left of the label
   */
  icon: JSX.Element;
  /**
   * Name of the page that a user will be redirected to  when
   * clicking on the item
   */
  label: string;
}

const useStyles = makeStyles(
  createStyles({
    listItem: {
      height: 65,
    },
    link: {
      textDecoration: 'none',
      color: 'inherit',
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
  const isSelected = useSelectedRoute(route);

  return (
    <Link to={route} className={classes.link}>
      <ListItem
        button
        divider={!lastItem}
        selected={isSelected}
        className={classes.listItem}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>
          <Typography variant="button">{label}</Typography>
        </ListItemText>
      </ListItem>
    </Link>
  );
};
