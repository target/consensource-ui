import React from 'react';
import { Typography, Grid, makeStyles, createStyles } from '@material-ui/core';
import { ClaimedIconButton, UnverifiedFactoryAlert } from 'view/components';
import { FactoryResData } from 'services/api';

const useStyles = makeStyles(
  createStyles({
    claimedIconBtn: {
      marginTop: 12.5,
      marginLeft: 7.5,
    },
  }),
);

export interface HeaderProps {
  name: FactoryResData['name'];
  isClaimed: boolean;
}

export interface ClaimedHeaderProps {
  name: HeaderProps['name'];
}

export interface UnclaimedHeaderProps {
  name: HeaderProps['name'];
}

const ClaimedHeader = ({ name }: ClaimedHeaderProps) => {
  const classes = useStyles();

  return (
    <Grid container justify="center" spacing={2}>
      <Grid item>
        <Typography variant="h2" align="center">
          {name}
        </Typography>
      </Grid>

      <Grid item>
        <div className={classes.claimedIconBtn}>
          <ClaimedIconButton fontSize="large" />
        </div>
      </Grid>
    </Grid>
  );
};

const UnclaimedHeader = ({ name }: UnclaimedHeaderProps) => {
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Typography variant="h2" align="center">
          {name}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <UnverifiedFactoryAlert />
      </Grid>
    </Grid>
  );
};

export const Header = ({ name, isClaimed }: HeaderProps) => {
  return isClaimed ? (
    <ClaimedHeader name={name} />
  ) : (
    <UnclaimedHeader name={name} />
  );
};
