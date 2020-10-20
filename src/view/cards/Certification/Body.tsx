import React from 'react';
import { Grid, Typography, makeStyles, createStyles } from '@material-ui/core';
import { CertResData } from 'services/api';
import { AssignmentTurnedInOutlined as CheckIcon } from '@material-ui/icons';
import { getLocaleFromUnix } from 'utils';

export interface BodyProps {
  validTo: CertResData['valid_to'];
}

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    icon: {
      color: palette.success.main,
    },
  }),
);

export const Body = ({ validTo }: BodyProps) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography align="center" color="textSecondary">
          <i>Description</i>
        </Typography>
      </Grid>

      <Grid container item spacing={4}>
        <Grid item xs={1}>
          <CheckIcon className={classes.icon} />
        </Grid>
        <Grid item xs>
          <Typography variant="body1">{`Valid until ${getLocaleFromUnix(
            validTo,
          )}`}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
