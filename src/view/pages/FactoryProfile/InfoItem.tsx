import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

export interface InfoItemProps {
  title: string;
  val?: string;
}

const useStyles = makeStyles(
  createStyles({
    title: {
      fontWeight: 'bold',
    },
  }),
);

export function InfoItem({ title, val }: InfoItemProps) {
  const classes = useStyles();

  return (
    <Grid item xs={4}>
      <Typography variant="body1" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body2">{val || '-'}</Typography>
    </Grid>
  );
}
