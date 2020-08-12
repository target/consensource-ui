import React, { useState } from 'react';
import {
  createOrgAction,
  ICreateOrgActionStrict,
  createOrgTransaction,
} from 'services/protobuf/organization';
import { Organization } from 'services/protobuf/compiled';
import { hash, HashingAlgorithms } from 'services/crypto';
import { VpnKey as Key } from '@material-ui/icons';
import { Button, Typography, Grid, TextField } from '@material-ui/core';
import { SelectOrganizationType } from 'view/forms/organization/SelectOrganizationType';
import { createBatch } from 'services/protobuf/batch';
import { useStores } from 'services/hooks';
import { FormErrMsg, TransactionFormProps } from 'view/forms/utils';
import { CreateContactForm } from './CreateContact';
import { CreateFactoryAddressForm } from './CreateFactoryAddress';

function makeOrgId(name: string) {
  return hash(name, HashingAlgorithms.sha256);
}

/**
 * Four-part form used to build a `CreateOrganizationAction` payload object
 * - First form is the org type
 * - Second form is for the required Org Contact
 * - Third (optional) form is for Factrory Address (only required if
 *   organization_type === Organization.Type.FACTORY)
 * - Fourth form is for the Org name
 */
export function CreateOrganizationForm({
  setBatchStatusUrl,
}: TransactionFormProps) {
  const { userStore, batchStore } = useStores();
  const [errMsg, setErrMsg] = useState('');
  const [org, setOrg] = useState<ICreateOrgActionStrict>({
    contacts: [] as Organization.IContact[],
    address: null,
    name: '',
    id: '',
    organization_type: Organization.Type.UNSET_TYPE,
  });

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    let signer;

    if (!userStore.user) {
      throw new Error('A signer is required to create an organization');
    } else {
      signer = userStore.user.signer;
    }

    const action = createOrgAction({ ...org, id: makeOrgId(org.name) });
    const txns = new Array(createOrgTransaction(action, signer));
    const batchListBytes = createBatch(txns, signer);

    try {
      const statusLink = await batchStore.submitBatch(batchListBytes);
      setBatchStatusUrl(statusLink);
    } catch ({ message }) {
      setErrMsg(message);
    }
  };

  const getCurrentForm = () => {
    if (org.organization_type === Organization.Type.UNSET_TYPE) {
      return (
        <>
          <Grid item xs={12}>
            <Typography variant="h6">Select Org Type</Typography>
          </Grid>

          <SelectOrganizationType
            onSubmit={(organization_type) =>
              setOrg({ ...org, organization_type })
            }
          />
        </>
      );
    }

    if (org.contacts.length === 0) {
      return (
        <>
          <Grid item xs={12}>
            <Typography variant="h6">Contact Info</Typography>
          </Grid>

          <CreateContactForm
            onSubmit={(contacts) => setOrg({ ...org, contacts: [contacts] })}
            submitLabel="Continue"
          />
        </>
      );
    }

    if (org.organization_type === Organization.Type.FACTORY && !org.address) {
      return (
        <>
          <Grid item xs={12}>
            <Typography variant="h6">Address Info</Typography>
          </Grid>

          <CreateFactoryAddressForm
            onSubmit={(address) => setOrg({ ...org, address })}
            submitLabel="Continue"
          />
        </>
      );
    }

    return (
      <>
        <Grid item xs={12}>
          <Typography variant="h6">Organization Info</Typography>
        </Grid>

        <form>
          <Grid container spacing={2}>
            <FormErrMsg msg={errMsg} />
            <Grid item xs={12}>
              <TextField
                color="secondary"
                value={org.name}
                onChange={(e) => setOrg({ ...org, name: e.target.value })}
                label="Organization Name"
                id="org-name"
                required
              />
            </Grid>
            <Grid item xs={12}>
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
      </>
    );
  };

  return <Grid container>{getCurrentForm()}</Grid>;
}
