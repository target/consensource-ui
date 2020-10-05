import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { CertResData } from 'services/api';
import { InfoItem } from 'view/components';

interface CertificateInfoProps {
  certificate: CertResData;
}

export const CertificateInfo = ({
  certificate: { standard_version, valid_from, valid_to },
}: CertificateInfoProps) => {
  return (
    <Grid direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4">Certificate Info</Typography>
      </Grid>

      <Grid container item>
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
    </Grid>
  );
};
