import React from 'react';
import { useAsync } from 'react-async-hook';
import { useParams } from 'react-router-dom';
import { Typography, Grid } from '@material-ui/core';
import { LoadingWithMinDisplay } from 'view/components';
import { fetchFactoryByOrgIdWithCerts } from 'services/api';
import { Contacts } from './Contacts';
import { Address } from './Address';
import { Certifications } from './Certifications';
import { Header } from './Header';

export const FactoryProfile = () => {
  const { factoryId } = useParams();
  const { result, error, loading } = useAsync(fetchFactoryByOrgIdWithCerts, [
    factoryId,
  ]);

  return (
    <LoadingWithMinDisplay isLoading={loading}>
      {error && (
        <Grid item xs={12}>
          <Typography color="error">Failed to load factory details</Typography>
        </Grid>
      )}

      {result && (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Header
              name={result.data.name}
              isClaimed={!result.data.assertion_id}
            />
          </Grid>

          <Grid item xs={12}>
            <Certifications certifications={result.data.certificates} />
          </Grid>

          <Grid item xs={12}>
            <Contacts contacts={result.data.contacts} />
          </Grid>

          <Grid item xs={12}>
            <Address address={result.data.address} />
          </Grid>
        </Grid>
      )}
    </LoadingWithMinDisplay>
  );
};
