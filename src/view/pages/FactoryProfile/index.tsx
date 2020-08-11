import React from 'react';
import { useAsync } from 'react-async-hook';
import { fetchFactoryByOrgId } from 'services/api';
import { useParams } from 'react-router-dom';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ClaimedIconButton, AsyncCircularProgress } from 'view/components';
import { FactoryProfileContacts } from './Contacts';
import { FactoryProfileAddress } from './Address';
import { FactoryProfileCertifications } from './Certifications';
import { UnverifiedFactoryAlert } from './UnverifiedFactoryAlert';

const useStyles = makeStyles(
  createStyles({
    title: {
      textAlign: 'center',
    },
    claimedIconBtn: {
      marginTop: 12.5,
      marginLeft: 7.5,
    },
  }),
);

export function FactoryProfile() {
  const classes = useStyles();
  const { factoryId } = useParams();

  const { result, error, loading } = useAsync(fetchFactoryByOrgId, [factoryId]);

  return (
    <AsyncCircularProgress isLoading={loading} size={60}>
      {error && (
        <Grid item xs={12}>
          <Typography color="error">Failed to load factory details</Typography>
        </Grid>
      )}

      {result && (
        <Grid container spacing={6}>
          <Grid container item justify="center" xs={12}>
            <Typography variant="h2" className={classes.title}>
              {result.data.name}
            </Typography>

            {!result.data.assertion_id && (
              <div className={classes.claimedIconBtn}>
                <ClaimedIconButton fontSize="large" />
              </div>
            )}
          </Grid>

          {result.data.assertion_id && (
            <Grid container justify="center">
              <Grid item xs={12} sm={10} md={8} lg={6}>
                <UnverifiedFactoryAlert factory={result.data} />
              </Grid>
            </Grid>
          )}

          <Grid item xs={12}>
            <FactoryProfileCertifications
              certifications={result.data.certificates}
            />
          </Grid>

          <Grid item xs={12}>
            <FactoryProfileContacts contacts={result.data.contacts} />
          </Grid>

          <Grid item xs={12}>
            <FactoryProfileAddress address={result.data.address} />
          </Grid>
        </Grid>
      )}
    </AsyncCircularProgress>
  );
}
