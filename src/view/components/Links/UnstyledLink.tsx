import React, { FC } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core';
import Link from '@material-ui/core/Link';

export interface UnstyledLinkProps extends LinkProps {
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
 * the default link styling to remove text decorations and color.
 */
export const UnstyledLink: FC<UnstyledLinkProps> = ({
  children,
  to,
  ...otherProps
}) => {
  const classes = useStyles();

  return (
    <Link
      component={RouterLink}
      to={{ pathname: to, state: { ...otherProps } }}
      className={classes.link}
    >
      {children}
    </Link>
  );
};
