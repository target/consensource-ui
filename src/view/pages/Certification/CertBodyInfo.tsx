import React from 'react';
import { useQuery } from 'react-query';
import { Typography, Grid } from '@material-ui/core';
import { LoadingWithMinDisplay, InfoItem } from 'view/components';
import { fetchOrganizationById, CertResData } from 'services/api';

interface CertBodyInfoProps {
  certificate: CertResData;
}

export function CertBodyInfo({ certificate }: CertBodyInfoProps) {
  const { certifying_body_id, certifying_body } = certificate;
  const queryRes = useQuery('fetchOrganizationById', () =>
    fetchOrganizationById(certifying_body_id),
  );

  return (
    <LoadingWithMinDisplay queryRes={queryRes}>
      {queryRes.data && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Certifying Body Info</Typography>
          </Grid>
          <InfoItem title="Certifying Body" val={certifying_body} />
        </Grid>
      )}
    </LoadingWithMinDisplay>
  );
}
