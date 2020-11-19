import React from 'react';
import { useQuery } from 'react-query';
import { Grid } from '@material-ui/core';
import { ClaimableDataPageHeader, FullPageLoading } from 'view/components';
import { fetchFactoryByOrgId, FactoryResData } from 'services/api';
import { Contacts } from './Contacts';
import { Address } from './Address';
import { Certifications } from './Certifications';
import { ClaimFactoryFab } from './ClaimFactoryFab';

export interface FactoryProfileProps {
  factoryId: FactoryResData['id'];
}

export const FactoryProfile = ({ factoryId }: FactoryProfileProps) => {
  const queryRes = useQuery('fetchFactoryByOrgId', () =>
    fetchFactoryByOrgId(factoryId, { expand: true }),
  );

  return (
    <FullPageLoading
      queryRes={queryRes}
      loadingLabel="Loading factory info..."
      errorLabel="Failed to load factory details"
    >
      {({ data: factory }) => (
        <Grid container direction="column" spacing={6}>
          <Grid container item>
            <ClaimableDataPageHeader title={factory.name} data={factory} />
          </Grid>

          <Grid container item>
            {/* TODO: `certificates` shouldn't be possibly undefined when expand param is included */}
            <Certifications certifications={factory.certificates || []} />
          </Grid>

          <Grid container item>
            <Contacts contacts={factory.contacts} />
          </Grid>

          <Grid container item>
            <Address address={factory.address} />
          </Grid>

          <ClaimFactoryFab factory={factory} />
        </Grid>
      )}
    </FullPageLoading>
  );
};
