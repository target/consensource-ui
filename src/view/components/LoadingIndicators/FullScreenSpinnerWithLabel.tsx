import React from 'react';
import {
  CircularProgress,
  Grid,
  Typography,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { NAVBAR_HEIGHT } from '../NavBar';

export interface FullScreenSpinnerWithLabelProps {
  /**
   * Label that will be displayed beneath the spinner.
   */
  label: string;
}

const SPINNER_SIZE = window.screen.width / 8;

const useStyles = makeStyles(
  createStyles({
    center: {
      minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px - ${SPINNER_SIZE}px)`,
    },
  }),
);

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
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      spacing={2}
      className={classes.center}
    >
      <Grid item>
        <CircularProgress size={SPINNER_SIZE} />
      </Grid>
      <Grid item>
        <Typography variant="h5">{label}</Typography>
      </Grid>
    </Grid>
  );
};
