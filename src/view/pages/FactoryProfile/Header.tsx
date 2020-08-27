import React from 'react';
import { Typography, Grid, makeStyles, createStyles } from '@material-ui/core';
import { ClaimedIconButton, UnverifiedFactoryAlert } from 'view/components';
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

const ClaimedHeader = ({ name }: { name: HeaderProps['name'] }) => {
  const classes = useStyles();

  return (
    <Grid container item justify="center" xs={12}>
      <Typography variant="h2" className={classes.title}>
        {name}
      </Typography>

      <div className={classes.claimedIconBtn}>
        <ClaimedIconButton fontSize="large" />
      </div>
    </Grid>
  );
};

const UnclaimedHeader = ({ name }: { name: HeaderProps['name'] }) => {
  const classes = useStyles();

  return (
    <Grid container justify="center" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2" className={classes.title}>
          {name}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={10} md={8} lg={6}>
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
