import React from 'react';
import { Grid, Typography, makeStyles, createStyles } from '@material-ui/core';
import { CertResData } from 'services/api';
import { UnstyledLink } from 'view/components';

export interface HeaderProps {
  certificate: CertResData;
}

// TODO: Make a generic styled link component
const useStyles = makeStyles(({ palette }) =>
  createStyles({
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
    certName: {
      borderBottom: `2px solid ${palette.primary.light}`,
      cursor: 'pointer',
      '&:hover': {
        borderBottom: `2px solid ${palette.primary.main}`,
      },
    },
  }),
);

export const Header = ({
  certificate: { standard_name, factory_name, factory_id },
}: HeaderProps) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="center" spacing={2}>
      <Grid item>
        <Typography align="center" variant="h3">
          {standard_name}
        </Typography>
      </Grid>
      <Grid container item justify="center" spacing={1}>
        <Grid item>
          <Typography align="center" color="textSecondary">
            Granted to:
          </Typography>
        </Grid>
        <Grid item>
          <UnstyledLink to={`/factories/${factory_id}`}>
            <Typography
              color="textSecondary"
              align="center"
              className={classes.certName}
            >
              {factory_name}
            </Typography>
          </UnstyledLink>
        </Grid>
      </Grid>
    </Grid>
  );
};
