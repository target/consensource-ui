import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { CertResData } from 'services/api';
import { CertificationCard } from 'view/cards';
import { SequentialGrow } from 'view/components';

export interface CertificationsProps {
  certifications: CertResData[];
}

export const Certifications = ({ certifications }: CertificationsProps) => {
  const hasCertifications = certifications.length > 0;

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h4">Certifications</Typography>
      </Grid>

      {!hasCertifications && (
        <Grid item xs={2}>
          <Typography variant="body1">
            <i>No certifications</i>
          </Typography>
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
};
