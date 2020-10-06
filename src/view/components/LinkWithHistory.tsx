import React, { FC } from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core';

export interface LinkWithHistory extends LinkProps {
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
export const LinkWithHistory: FC<LinkWithHistory> = ({
  children,
  to,
  ...otherProps
}) => {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <Link
      {...otherProps}
      to={{ pathname: to, state: { from: pathname } }}
      className={classes.link}
    >
      {children}
    </Link>
  );
};
