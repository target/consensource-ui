import React from 'react';
import { useQuery } from 'react-query';
import { Fab, Grid } from '@material-ui/core';
import { ClaimableDataPageHeader, FullPageLoading } from 'view/components';
import { fetchFactoryByOrgId, FactoryResData } from 'services/api';
import { Contacts } from './Contacts';
import { Address } from './Address';
import { Certifications } from './Certifications';
import { TransferFactoryDialog } from 'view/modals';
export interface FactoryProfileProps {
  factoryId: FactoryResData['id'];
}

export const FactoryProfile = ({ factoryId }: FactoryProfileProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
          <Grid container item>
            <Fab
              color="primary"
              variant="extended"
              aria-label="claim"
              onClick={handleOpen}
            >
              Claim this factory
            </Fab>
            <TransferFactoryDialog open={open} handleClose={handleClose} />
          </Grid>
        </Grid>
      )}
    </FullPageLoading>
  );
};
