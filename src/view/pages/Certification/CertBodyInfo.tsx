import React from 'react';
import { useQuery } from 'react-query';
import { Typography, Grid, CircularProgress } from '@material-ui/core';
import {
  LoadingWithMinDisplay,
  WarningIconError,
  InfoItem,
} from 'view/components';
import { fetchOrganizationById, CertResData } from 'services/api';

interface CertBodyInfoProps {
  certificate: CertResData;
}

export function CertBodyInfo({ certificate }: CertBodyInfoProps) {
  const { certifying_body_id, certifying_body } = certificate;
  const { isLoading, error, data } = useQuery('fetchOrganizationById', () =>
    fetchOrganizationById(certifying_body_id),
  );

  return (
    <LoadingWithMinDisplay
      isLoading={isLoading}
      loadingIndicator={<CircularProgress />}
    >
      {error && (
        <WarningIconError>Failed to load certifying body info</WarningIconError>
      )}
      {data && (
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
