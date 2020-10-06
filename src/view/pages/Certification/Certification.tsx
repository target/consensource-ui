import React from 'react';
import { useQuery } from 'react-query';
import { Divider, Grid } from '@material-ui/core';
import { FullPageLoading } from 'view/components';
import { fetchCertificateById, CertResData } from 'services/api';
import { Header } from './Header';
import { CertificateInfo } from './CertificateInfo';
import { CertBodyInfo } from './CertBodyInfo';

export interface CertificationProps {
  certificationId: CertResData['id'];
}

export const Certification = ({ certificationId }: CertificationProps) => {
  const queryRes = useQuery('fetchCertificateById', () =>
    fetchCertificateById(certificationId),
  );

  return (
    <FullPageLoading
      queryRes={queryRes}
      loadingLabel="Loading certificate info..."
      errorLabel="Failed to load certification"
    >
      {({ data: certificate }) => (
        <Grid container direction="column" spacing={6}>
          <Grid container item>
            <Header certificate={certificate} />
          </Grid>

          <Grid item>
            <Divider variant="middle" />
          </Grid>

          <Grid container item>
            <CertificateInfo certificate={certificate} />
          </Grid>

          <Grid container item>
            <CertBodyInfo certificate={certificate} />
          </Grid>
        </Grid>
      )}
    </FullPageLoading>
  );
};
