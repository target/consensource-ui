import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { useSelectedRoute } from 'services/hooks';
import { Link } from '../Links';

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
  openInNewTab?: boolean;
}

export const NavbarLink = ({
  label,
  route,
  openInNewTab = false,
}: NavbarLink) => {
  const classes = useStyles();
  const isSelected = useSelectedRoute(route);

  return (
    <Link
      to={route}
      target={openInNewTab ? '_blank' : ''}
      variant="body1"
      className={`${classes.link} ${isSelected && classes.selected}`}
    >
      {label}
    </Link>
  );
};
