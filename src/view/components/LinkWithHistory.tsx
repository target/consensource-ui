import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core';

export interface LinkWithHistoryProps {
  to: string;
}

const useStyles = makeStyles(
  createStyles({
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
  }),
);

/**
 * Wrapper component around a `react-router-dom` `<Link />` that overrides
 * the default link styling and pushes an entry to the history stack from
 * the current `pathname` when a user clicks the link.
 */
export const LinkWithHistory: FC<LinkWithHistoryProps> = ({ children, to }) => {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <Link
      to={{ pathname: to, state: { from: pathname } }}
      className={classes.link}
    >
      {children}
    </Link>
  );
};
