import React from 'react';
import { Typography, Grid, makeStyles, createStyles } from '@material-ui/core';
import {
  ClaimedIconButton,
  UnverifiedFactoryAlert,
  HistoryGoBackButton,
} from 'view/components';
import { FactoryResData } from 'services/api';

const useStyles = makeStyles(
  createStyles({
    title: {
      textAlign: 'center',
    },
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
    <Grid container>
      <Grid item xs={2}>
        <HistoryGoBackButton />
      </Grid>

      <Grid container item justify="center" spacing={2} xs={8}>
        <Typography variant="h2" className={classes.title}>
          {name}
        </Typography>

        <div className={classes.claimedIconBtn}>
          <ClaimedIconButton fontSize="large" />
        </div>
      </Grid>
    </Grid>
  );
};

const UnclaimedHeader = ({ name }: UnclaimedHeaderProps) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={2}>
        <HistoryGoBackButton />
      </Grid>

      <Grid container item direction="column" spacing={2} xs={8}>
        <Grid item>
          <Typography variant="h2" className={classes.title}>
            {name}
          </Typography>
        </Grid>

        <Grid item>
          <UnverifiedFactoryAlert />
        </Grid>
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
