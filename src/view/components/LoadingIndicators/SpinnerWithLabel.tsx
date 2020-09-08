import React from 'react';
import {
  CircularProgress,
  Grid,
  Typography,
  TypographyProps,
} from '@material-ui/core';
import { FullScreenSpinnerSize } from './utils';

export interface SpinnerWithLabelProps {
  /**
   * **Default value:** _"Loading..."_
   *
   * Label that will be displayed beneath the spinner.
   */
  label?: string;
  /**
   * **Default value:** _"h5"_
   *
   * "variant" prop for the label element
   */
  typeVariant?: TypographyProps['variant'];
  /**
   * **Default value:** _FullScreenSpinnerSize_ (window.screen.width / 8)
   *
   * Size of the spinner animation.
   */
  spinnerSize?: number;
}

export const SpinnerWithLabel = ({
  label = 'Loading...',
  typeVariant = 'h5',
  spinnerSize = FullScreenSpinnerSize,
}: SpinnerWithLabelProps) => {
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <CircularProgress size={spinnerSize} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant={typeVariant}>{label}</Typography>
      </Grid>
    </Grid>
  );
};
