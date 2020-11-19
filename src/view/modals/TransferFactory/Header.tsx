import React from 'react';
import {
  IconButton,
  IconButtonProps,
  Grid,
  Typography,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

export interface HeaderProps {
  handleClose: IconButtonProps['onClick'];
}

export const Header = ({ handleClose }: HeaderProps) => {
  const spacer = <Grid item xs={1} />;

  return (
    <Grid container justify="space-between">
      {spacer}
      <Grid
        container
        alignItems="center"
        direction="column"
        xs={10}
        spacing={2}
      >
        <Grid item>
          <Typography variant="h3">Confirm Factory Information</Typography>
        </Grid>
        <Grid item>
          <Typography color="textSecondary">
            Claim this factory to manage address info, contact info, and more.
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={1}>
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
