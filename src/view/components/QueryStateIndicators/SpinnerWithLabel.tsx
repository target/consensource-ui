import React, { FC } from 'react';
import {
  CircularProgress,
  Grid,
  Typography,
  TypographyProps,
  CircularProgressProps,
} from '@material-ui/core';

const SPINNER_SIZE = window.screen.width / 8;

export interface SpinnerWithLabelProps {
  label?: string;
  spinnerSize?: CircularProgressProps['size'];
  typeVariant?: TypographyProps['variant'];
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
export const SpinnerWithLabel: FC<SpinnerWithLabelProps> = ({
  children,
  spinnerSize = SPINNER_SIZE,
  typeVariant = 'h5',
}) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      spacing={2}
    >
      <Grid item>
        <CircularProgress size={spinnerSize} />
      </Grid>
      <Grid item>
        <Typography variant={typeVariant}>{children}</Typography>
      </Grid>
    </Grid>
  );
};
