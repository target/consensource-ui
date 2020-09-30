import React from 'react';
import { useQuery } from 'react-query';
import { Grid } from '@material-ui/core';
import { FullPageLoading } from 'view/components';
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
  const queryRes = useQuery('fetchFactoryByOrgId', () =>
    fetchFactoryByOrgId(factoryId, baseParms),
  );

  const { data } = queryRes;

  return (
    <FullPageLoading
      queryRes={queryRes}
      loadingLabel="Loading factory info..."
      errorLabel="Failed to load factory details"
    >
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
    </FullPageLoading>
  );
};
