import React from 'react';
import { useQuery } from 'react-query';
import {
  Typography,
  Divider,
  Grid,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { FullPageLoading } from 'view/components';
import { fetchCertificateById, CertResData } from 'services/api';
import { CertificateInfo } from './CertificateInfo';
import { CertBodyInfo } from './CertBodyInfo';

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    check: {
      color: palette.success.main,
    },
    centeredText: {
      textAlign: 'center',
    },
  }),
);

export interface CertificationProps {
  certificationId: CertResData['id'];
}

export const Certification = ({ certificationId }: CertificationProps) => {
  const classes = useStyles();
  const queryRes = useQuery('fetchCertificateById', () =>
    fetchCertificateById(certificationId),
  );

  return (
    <FullPageLoading
      queryRes={queryRes}
      loadingLabel="Loading certificate info..."
      errorLabel="Failed to load certification"
    >
      {({ data }) => (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography className={classes.centeredText} variant="h3">
              {data.standard_name}
            </Typography>
            <Typography className={classes.centeredText} color="textSecondary">
              {`Granted to: ${data.factory_name}`}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle" />
          </Grid>

          <Grid item xs={12}>
            <CertificateInfo certificate={data} />
          </Grid>

          <Grid item xs={12}>
            <CertBodyInfo certificate={data} />
          </Grid>
        </Grid>
      )}
    </FullPageLoading>
  );
};
