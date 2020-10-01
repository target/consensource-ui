import React from 'react';
import { Grid, Typography, makeStyles, createStyles } from '@material-ui/core';

export interface InfoItemProps {
  title: string;
  val?: string;
}

const useStyles = makeStyles(
  createStyles({
    val: {
      wordWrap: 'break-word',
    },
  }),
);

export function InfoItem({ title, val }: InfoItemProps) {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1" className={classes.val}>
        {val || '-'}
      </Typography>
    </Grid>
  );
}
