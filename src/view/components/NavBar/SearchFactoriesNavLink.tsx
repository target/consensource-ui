import React from 'react';
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
  }),
);

export const SearchFactoriesNavLink = () => {
  const classes = useStyles();

  return (
    <Link to="/search" className={classes.link}>
      <Typography variant="body1" noWrap>
        Search Factories
      </Typography>
    </Link>
  );
};
