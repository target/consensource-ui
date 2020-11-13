import React from 'react';
import { useSelectedRoute } from 'services/hooks';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { UnstyledLink } from '../../Links/UnstyledLink';

export interface SidebarItemProps {
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

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    listItem: {
      height: 50,
    },
    selectedListItem: {
      borderLeft: `5px solid ${palette.primary.main}`,
    },
  }),
);

export const SidebarItem = ({ route, icon, label }: SidebarItemProps) => {
  const classes = useStyles();
  const isSelected = useSelectedRoute(route);

  return (
    <UnstyledLink to={route}>
      <ListItem
        button
        selected={isSelected}
        className={`${classes.listItem} ${
          isSelected && classes.selectedListItem
        }`}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>{label}</ListItemText>
      </ListItem>
    </UnstyledLink>
  );
};
