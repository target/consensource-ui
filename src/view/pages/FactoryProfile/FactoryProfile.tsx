import React from 'react';
import { useQuery } from 'react-query';
import { Grid } from '@material-ui/core';
import { FullPageLoading } from 'view/components';
import { fetchFactoryByOrgId, FactoryResData } from 'services/api';
import { Contacts } from './Contacts';
import { Address } from './Address';
import { Certifications } from './Certifications';
import { Header } from './Header';

export interface FactoryProfileProps {
  factoryId: FactoryResData['id'];
}

export const FactoryProfile = ({ factoryId }: FactoryProfileProps) => {
  const queryRes = useQuery('fetchFactoryByOrgId', () =>
    fetchFactoryByOrgId(factoryId, { expand: false }),
  );

  return (
    <FullPageLoading
      queryRes={queryRes}
      loadingLabel="Loading factory info..."
      errorLabel="Failed to load factory details"
    >
      {({ data: { name, assertion_id, certificates, contacts, address } }) => (
        <Grid container direction="column" spacing={6}>
          <Grid container item>
            <Header name={name} isClaimed={!assertion_id} />
          </Grid>

          <Grid container item>
            {/* TODO: `certificates` shouldn't be possibly undefined when expand param is included */}
            <Certifications certifications={certificates || []} />
          </Grid>

          <Grid container item>
            <Contacts contacts={contacts} />
          </Grid>

          <Grid container item>
            <Address address={address} />
          </Grid>
        </Grid>
      )}
    </FullPageLoading>
  );
};
