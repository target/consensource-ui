import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { CertResData } from 'services/api';
import { InfoItem } from 'view/components';

interface CertificateInfoProps {
  certificate: CertResData;
}

export function CertificateInfo({ certificate }: CertificateInfoProps) {
  const { standard_version, valid_from, valid_to } = certificate;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Certificate Info</Typography>
      </Grid>

      <InfoItem title="Standard Version" val={standard_version} />
      <InfoItem
        title="Valid From"
        val={new Date(valid_from).toLocaleDateString()}
      />
      <InfoItem
        title="Valid To"
        val={new Date(valid_to).toLocaleDateString()}
      />
    </Grid>
  );
}
