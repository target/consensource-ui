import React from 'react';
import { Grid, Typography, makeStyles, createStyles } from '@material-ui/core';
import { CertResData } from 'services/api';
import { AssignmentTurnedInOutlined as CheckIcon } from '@material-ui/icons';

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
  const validToStr = new Date(validTo).toLocaleDateString();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography align="center" color="textSecondary">
          TODO: Descriptions
        </Typography>
      </Grid>

      <Grid container item spacing={4}>
        <Grid item xs={1}>
          <CheckIcon className={classes.icon} />
        </Grid>
        <Grid item xs>
          <Typography variant="body1">Valid until {validToStr}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
