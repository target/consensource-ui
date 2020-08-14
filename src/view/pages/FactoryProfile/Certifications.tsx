import React from 'react';
import { Grid, Typography, Grow } from '@material-ui/core';
import { CertResData } from 'services/api';
import { CertificationCard } from 'view/cards';
import { SequentialGrow } from 'view/components';

export interface FactoryProfileCertificationsProps {
  certifications?: CertResData[];
}

export function FactoryProfileCertifications({
  certifications = [
    {
      id: 'test',
      certifying_body_id: 'test',
      certifying_body: 'test',
      factory_id: 'test',
      factory_name: 'test',
      standard_id: 'test',
      standard_name: 'test',
      standard_version: 'test',
      valid_from: 0,
      valid_to: 0,
    },
    {
      id: 'test',
      certifying_body_id: 'test',
      certifying_body: 'test',
      factory_id: 'test',
      factory_name: 'test',
      standard_id: 'test',
      standard_name: 'test',
      standard_version: 'test',
      valid_from: 0,
      valid_to: 0,
    },
    {
      id: 'test',
      certifying_body_id: 'test',
      certifying_body: 'test',
      factory_id: 'test',
      factory_name: 'test',
      standard_id: 'test',
      standard_name: 'test',
      standard_version: 'test',
      valid_from: 0,
      valid_to: 0,
    },
  ],
}: FactoryProfileCertificationsProps) {
  const hasCertifications = certifications && certifications.length > 0;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Certifications</Typography>
      </Grid>

      {!hasCertifications && (
        <Grid item xs={2}>
          <Typography variant="body1">No certifications</Typography>
        </Grid>
      )}

      {hasCertifications && (
        <SequentialGrow
          items={certifications}
          renderItem={(certification) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <CertificationCard certification={certification} />
            </Grid>
          )}
        />
      )}
    </Grid>
  );
}
