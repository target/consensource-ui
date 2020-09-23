import React from 'react';
import { useQuery } from 'react-query';
import {
  Typography,
  Divider,
  Grid,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import {
  LoadingWithMinDisplay,
  FullScreenSpinnerWithLabel,
  WarningIconError,
} from 'view/components';
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
  const { isLoading, error, data } = useQuery('fetchCertificateById', () =>
    fetchCertificateById(certificationId),
  );

  const classes = useStyles();

  return (
    <LoadingWithMinDisplay
      isLoading={isLoading}
      loadingIndicator={
        <FullScreenSpinnerWithLabel label="Loading certificate info..." />
      }
    >
      {error && (
        <WarningIconError>Failed to load certification</WarningIconError>
      )}

      {data && (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography className={classes.centeredText} variant="h3">
              {data.data.standard_name}
            </Typography>
            <Typography className={classes.centeredText} color="textSecondary">
              {`Granted to: ${data.data.factory_name}`}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle" />
          </Grid>

          <Grid item xs={12}>
            <CertificateInfo certificate={data.data} />
          </Grid>

          <Grid item xs={12}>
            <CertBodyInfo certificate={data.data} />
          </Grid>
        </Grid>
      )}
    </LoadingWithMinDisplay>
  );
};
