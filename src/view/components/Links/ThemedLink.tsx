import React, { FC } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { makeStyles, createStyles, Link as MuiLink } from '@material-ui/core';

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
 * Themed Link component with sytling to remove text decorations and color and add in red underline.
 */
export const ThemedLink: FC<ThemedLinkProps> = ({
  children,
  to,
  ...otherProps
}) => {
  const classes = useStyles();

  return (
    <MuiLink
      component={RouterLink}
      to={{ pathname: to, state: { ...otherProps } }}
      className={classes.link}
    >
      {children}
    </MuiLink>
  );
};
