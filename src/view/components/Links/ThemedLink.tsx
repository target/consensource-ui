import React, { FC } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core';
import Link from '@material-ui/core/Link';

export interface ThemedLinkProps extends LinkProps {
  to: string;
}

export const useStyles = makeStyles(({ palette }) =>
  createStyles({
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
    name: {
      borderBottom: `2px solid ${palette.primary.light}`,
      cursor: 'pointer',
      '&:hover': {
        borderBottom: `2px solid ${palette.primary.main}`,
      },
    },
  }),
);

/**
 * Wrapper component around a `react-router-dom` `<Link />` that overrides
 * the default link styling to remove text decorations and color.
 */
export const ThemedLink: FC<ThemedLinkProps> = ({ children, to }) => {
  const classes = useStyles();

  return (
    <Link component={RouterLink} to={{ pathname: to }} className={classes.link}>
      {children}
    </Link>
  );
};
