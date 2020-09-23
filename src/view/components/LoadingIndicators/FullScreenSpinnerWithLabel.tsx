import React from 'react';
import { CircularProgress, Grid, Typography } from '@material-ui/core';

export interface FullScreenSpinnerWithLabelProps {
  /**
   * Label that will be displayed beneath the spinner.
   */
  label: string;
}

/**
 * `<CircularProgress />` component that displays with a label
 * beneath the spinner.
 *
 * Note that this component should primarily be used for loading
 * animations on top-level pages, components, etc. If there is
 * an async operation on a sub-component (e.g. a single card on a page),
 * than a regular `<CircularProgress />` should likely
 * be used to avoid unnecessary information from the label.
 *
 */
export const FullScreenSpinnerWithLabel = ({
  label,
}: FullScreenSpinnerWithLabelProps) => {
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <CircularProgress size={window.screen.width / 8} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{label}</Typography>
      </Grid>
    </Grid>
  );
};
