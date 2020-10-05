import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { InfoItem } from 'view/components';
import { CertResData } from 'services/api';

interface CertBodyInfoProps {
  certificate: CertResData;
}

export const CertBodyInfo = ({
  certificate: { certifying_body },
}: CertBodyInfoProps) => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4">Certifying Body Info</Typography>
      </Grid>

      <Grid item>
        <InfoItem title="Certifying Body" val={certifying_body} />
      </Grid>
    </Grid>
  );
};
