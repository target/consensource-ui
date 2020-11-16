import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { CertResData } from 'services/api';
import { ThemedLink, useStyles, SubtitleText } from 'view/components';

export interface HeaderProps {
  certificate: CertResData;
}

export const GrantedToSubtitle = ({
  certificate: { factory_name, factory_id },
}: HeaderProps) => {
  const classes = useStyles();

  return (
    <Grid container item justify="center" spacing={1}>
      <Grid item>
        <SubtitleText>Granted to:</SubtitleText>
      </Grid>
      <Grid item>
        <ThemedLink to={`/factories/${factory_id}`}>
          <Typography
            color="textSecondary"
            align="center"
            className={classes.name}
          >
            {factory_name}
          </Typography>
        </ThemedLink>
      </Grid>
    </Grid>
  );
};
