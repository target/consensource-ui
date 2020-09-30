import React, { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Warning as WarningIcon } from '@material-ui/icons';

export interface WarningIconErrorProps {
  size?: 'small' | 'large';
}

export const WarningIconError: FC<WarningIconErrorProps> = ({
  children,
  size = 'small',
}) => {
  return (
    <Grid container direction="column" alignItems="center" spacing={1}>
      <Grid item xs={12}>
        <WarningIcon fontSize={size} color="error" />
      </Grid>
      <Grid item xs={12}>
        <Typography variant={size === 'small' ? 'body1' : 'h6'} color="error">
          {children}
        </Typography>
      </Grid>
    </Grid>
  );
};
