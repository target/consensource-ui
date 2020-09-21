import React from 'react';
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelectedRoute } from 'services/hooks';

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    link: {
      textDecoration: 'none',
      color: 'white',
      marginRight: spacing(4),
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    selected: {
      fontWeight: 'bold',
      textDecoration: 'underline',
    },
  }),
);

export interface NavbarLink {
  label: string;
  route: string;
}

export const NavbarLink = ({ label, route }: NavbarLink) => {
  const classes = useStyles();
  const isSelected = useSelectedRoute(route);

  return (
    <Link to={route} className={classes.link}>
      <Typography
        variant="body1"
        className={`${isSelected && classes.selected}`}
      >
        {label}
      </Typography>
    </Link>
  );
};