import React from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import { CertResData } from 'services/api';

export interface HeaderProps {
  standardName: CertResData['standard_name'];
}

export const Header = ({ standardName }: HeaderProps) => {
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography variant="h6" align="center">
          {standardName}
        </Typography>
      </Grid>

      <Grid item>
        <Divider variant="middle" />
      </Grid>
    </Grid>
  );
};
