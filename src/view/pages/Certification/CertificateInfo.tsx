import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { CertResData } from 'services/api';
import { InfoItem } from 'view/components';
import { getLocaleFromUnix } from 'utils';

interface CertificateInfoProps {
  certificate: CertResData;
}

export const CertificateInfo = ({
  certificate: { standard_version, valid_from, valid_to },
}: CertificateInfoProps) => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4">Certificate Info</Typography>
      </Grid>

      <Grid container item>
        <InfoItem title="Standard Version" val={standard_version} />
        <InfoItem title="Valid From" val={getLocaleFromUnix(valid_from)} />
        <InfoItem title="Valid To" val={getLocaleFromUnix(valid_to)} />
      </Grid>
    </Grid>
  );
};
