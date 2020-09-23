import React from 'react';
import { useQuery } from 'react-query';
import { Typography, Grid } from '@material-ui/core';
import {
  LoadingWithMinDisplay,
  FullScreenSpinnerWithLabel,
} from 'view/components';
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
  const baseParms = { expand: false };
  const { isLoading, error, data } = useQuery('fetchFactoryByOrgId', () =>
    fetchFactoryByOrgId(factoryId, baseParms),
  );

  return (
    <LoadingWithMinDisplay
      isLoading={isLoading}
      loadingIndicator={
        <FullScreenSpinnerWithLabel label="Loading factory info..." />
      }
    >
      {error && (
        <Grid item xs={12}>
          <Typography color="error">Failed to load factory details</Typography>
        </Grid>
      )}

      {data && (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Header name={data.data.name} isClaimed={!data.data.assertion_id} />
          </Grid>

          <Grid item xs={12}>
            {/* TODO: `certificates` shouldn't be possibly undefined when expand param is included */}
            <Certifications certifications={data.data.certificates || []} />
          </Grid>

          <Grid item xs={12}>
            <Contacts contacts={data.data.contacts} />
          </Grid>

          <Grid item xs={12}>
            <Address address={data.data.address} />
          </Grid>
        </Grid>
      )}
    </LoadingWithMinDisplay>
  );
};
