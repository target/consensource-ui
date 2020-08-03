import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
          <Grid item xs={12} md={8} lg={4}>
            <CertificationCard certification={certification} />
          </Grid>
        ))
      )}
    </Grid>
  );
}
