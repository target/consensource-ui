import React, { useState } from 'react';
import {
  createOrgAction,
  ICreateOrgActionStrict,
  createOrgTransaction,
} from 'services/protobuf/organization';
import { Organization } from 'services/protobuf/compiled';
import { VpnKey as Key } from '@material-ui/icons';
import { Button, Typography, Grid, TextField } from '@material-ui/core';
import { SelectOrganizationType } from 'view/forms/organization/SelectOrganizationType';
import { createBatch } from 'services/protobuf/batch';
import { useAuth } from 'services/hooks';
import { FormErrMsg, TransactionFormProps } from 'view/forms/utils';
import { postBatches } from 'services/api';
import { CreateContactForm } from './CreateContact';
import { CreateFactoryAddressForm } from './CreateFactoryAddress';

/**
 * Four-part form used to build a `CreateOrganizationAction` payload object
 * - First form is the org type
 * - Second form is for the required Org Contact
 * - Third (optional) form is for Factrory Address (only required if
 *   organization_type === Organization.Type.FACTORY)
 * - Fourth form is for the Org name
 */
export const CreateOrganizationForm = ({
  setBatchStatusLink,
}: TransactionFormProps) => {
  const { signer } = useAuth();
  const [errMsg, setErrMsg] = useState('');
  const [org, setOrg] = useState<ICreateOrgActionStrict>({
    contacts: [] as Organization.IContact[],
    address: null,
    name: '',
    organization_type: Organization.Type.UNSET_TYPE,
  });

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    const action = createOrgAction(org);
    const txns = new Array(createOrgTransaction(action, signer));
    const batchListBytes = createBatch(txns, signer);

    try {
      const { link } = await postBatches(batchListBytes);
      setBatchStatusLink(link);
    } catch ({ message }) {
      setErrMsg(message);
    }
  };

  const getCurrentForm = () => {
    if (org.organization_type === Organization.Type.UNSET_TYPE) {
      return (
        <SelectOrganizationType
          onSubmit={(organization_type) =>
            setOrg({ ...org, organization_type })
          }
          submitLabel="Select Org Type"
        />
      );
    }

    if (org.contacts.length === 0) {
      return (
        <CreateContactForm
          onSubmit={(contacts) => setOrg({ ...org, contacts: [contacts] })}
          submitLabel="Continue"
        />
      );
    }

    if (org.organization_type === Organization.Type.FACTORY && !org.address) {
      return (
        <CreateFactoryAddressForm
          onSubmit={(address) => setOrg({ ...org, address })}
          submitLabel="Continue"
        />
      );
    }

    return (
      <form>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <FormErrMsg msg={errMsg} />
          </Grid>

          <Grid item>
            <Typography variant="h6">Organization Info</Typography>
          </Grid>

          <Grid item>
            <TextField
              color="secondary"
              value={org.name}
              onChange={(e) => setOrg({ ...org, name: e.target.value })}
              label="Organization Name"
              id="org-name"
              required
            />
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              type="submit"
              color="secondary"
              onClick={submit}
              disabled={!org.name}
              endIcon={<Key />}
            >
              Create Organization
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  };

  return getCurrentForm();
};
