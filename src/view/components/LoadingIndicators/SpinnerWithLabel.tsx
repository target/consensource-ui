import React from 'react';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { FullScreenSpinnerSize } from './utils';

export interface SpinnerWithLabelProps {
  /**
   * **Default Value:** "Loading..."
   */
  label?: string;
  /**
   * **Default Value:** _FullScreenSpinnerSize_ (window.screen.width / 8)
   */
  size?: number;
}

export const SpinnerWithLabel = ({
  label = 'Loading...',
  size = FullScreenSpinnerSize,
}: SpinnerWithLabelProps) => {
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <CircularProgress size={size} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{label}</Typography>
      </Grid>
    </Grid>
  );
};
