import React from 'react';
import { Grid, Typography, Grow } from '@material-ui/core';
import { CertResData } from 'services/api';
import { CertificationCard } from 'view/cards';

export interface FactoryProfileCertificationsProps {
  certifications?: CertResData[];
}

export function FactoryProfileCertifications({
  certifications,
}: FactoryProfileCertificationsProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Certifications</Typography>
      </Grid>

      {!certifications || certifications.length === 0 ? (
        <Grid item xs={2}>
          <Typography variant="body1">No certifications</Typography>
        </Grid>
      ) : (
        certifications.map((certification) => (
          <Grow in timeout={1000} style={{ transformOrigin: '0 0 0' }}>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <CertificationCard certification={certification} />
            </Grid>
          </Grow>
        ))
      )}
    </Grid>
  );
}
