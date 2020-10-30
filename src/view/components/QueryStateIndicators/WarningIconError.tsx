import React, { FC } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { WarningIcon } from '../icons';

export interface WarningIconErrorProps {
  size?: 'small' | 'large';
}

export const WarningIconError: FC<WarningIconErrorProps> = ({
  children = '',
  size = 'small',
}) => {
  return (
    <Grid container direction="column" alignItems="center" spacing={1}>
      <Grid item>
        <WarningIcon fontSize={size} color="error" titleAccess="error" />
      </Grid>
      <Grid item>
        <Typography variant={size === 'small' ? 'body1' : 'h6'} color="error">
          {children}
        </Typography>
      </Grid>
    </Grid>
  );
};
