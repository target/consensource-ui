/* eslint-disable react/destructuring-assignment */
import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Link as MuiLink,
  LinkProps as MuiLinkProps,
  Button,
  ButtonProps,
  ListItemProps,
  ListItem,
} from '@material-ui/core';

/** Todo */
export const Link: FC<MuiLinkProps<RouterLink>> = (props) => {
  return (
    <MuiLink {...props} component={RouterLink}>
      {props.children}
    </MuiLink>
  );
};

export const ButtonLink: FC<ButtonProps<RouterLink>> = (props) => {
  return (
    <Button {...props} component={RouterLink}>
      {props.children}
    </Button>
  );
};

export const ListItemLink: FC<ListItemProps<RouterLink>> = (props) => {
  return (
    <ListItem {...props} button component={RouterLink}>
      {props.children}
    </ListItem>
  );
};
