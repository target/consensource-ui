import React from 'react';
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core';
import { useSelectedRoute } from 'services/hooks';
import { LinkWithHistory } from '../LinkWithHistory';

const useStyles = makeStyles(({ spacing, palette }: Theme) =>
  createStyles({
    link: {
      color: palette.primary.light,
      marginRight: spacing(2),
      '&:hover': {
        color: palette.primary.contrastText,
      },
    },
    selected: {
      color: palette.primary.contrastText,
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
    <LinkWithHistory to={route}>
      <Typography
        variant="body1"
        className={`${classes.link} ${isSelected && classes.selected}`}
      >
        {label}
      </Typography>
    </LinkWithHistory>
  );
};
