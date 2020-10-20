import React from 'react';
import { useQuery } from 'react-query';
import { Grid } from '@material-ui/core';
import { ClaimableDataPageHeader, FullPageLoading } from 'view/components';
import { fetchCertificateById, CertResData } from 'services/api';
import { hasOwnPropertySafe } from 'utils';
import { CertificateInfo } from './CertificateInfo';
import { CertBodyInfo } from './CertBodyInfo';
import { GrantedToSubtitle } from './GrantedToSubtitle';

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
            <ClaimableDataPageHeader
              title={certificate.standard_name}
              subtitle={<GrantedToSubtitle certificate={certificate} />}
              isClaimed={!hasOwnPropertySafe(certificate, 'assertion_id')}
            />
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
