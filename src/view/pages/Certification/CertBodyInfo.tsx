import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { InfoItem } from 'view/components';
import { CertResData } from 'services/api';

interface CertBodyInfoProps {
  certificate: CertResData;
}

export function CertBodyInfo({ certificate }: CertBodyInfoProps) {
  const { certifying_body } = certificate;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Certifying Body Info</Typography>
      </Grid>
      <InfoItem title="Certifying Body" val={certifying_body} />
    </Grid>
  );
}
