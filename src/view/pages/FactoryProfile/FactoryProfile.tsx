import React from 'react';
import { useAsync } from 'react-async-hook';
import { Typography, Grid } from '@material-ui/core';
import { LoadingWithMinDisplay } from 'view/components';
import { fetchFactoryByOrgId, FactoryResData } from 'services/api';
import { Contacts } from './Contacts';
import { Address } from './Address';
import { Certifications } from './Certifications';
import { Header } from './Header';

export interface FactoryProfile {
  factoryId: FactoryResData['id'];
}

export const FactoryProfile = ({ factoryId }: FactoryProfile) => {
  // Including the `expand` param includes certificates with factories
  const baseParms = { expand: true };
  const { result, error, loading } = useAsync(fetchFactoryByOrgId, [
    factoryId,
    baseParms,
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
            {/* TODO: `certificates` shouldn't be possibly undefined when expand param is included */}
            <Certifications certifications={result.data.certificates || []} />
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
