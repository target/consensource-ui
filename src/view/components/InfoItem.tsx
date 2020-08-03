import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export interface InfoItemProps {
  title: string;
  val?: string;
}

const useStyles = makeStyles(
  createStyles({
    title: {
      fontWeight: 'bold',
    },
    val: {
      wordWrap: 'break-word',
    },
  }),
);

export function InfoItem({ title, val }: InfoItemProps) {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Typography variant="body1" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body2" className={classes.val}>
        {val || '-'}
      </Typography>
    </Grid>
  );
}
