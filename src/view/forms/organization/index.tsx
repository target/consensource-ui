import React, { useState } from 'react';
import {
  createOrgAction,
  ICreateOrgActionStrict,
  createOrgTransaction,
} from 'services/protobuf/organization';
import CreateContactForm from 'view/forms/organization/CreateContact';
import CreateAddressForm from 'view/forms/organization/CreateFactoryAddress';
import { Organization } from 'services/protobuf/compiled';
import { hash, HashingAlgorithms } from 'services/crypto';
import Key from '@material-ui/icons/VpnKey';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { SelectOrganizationType } from 'view/forms/organization/SelectOrganizationType';
import { createBatch } from 'services/protobuf/batch';
import { submitBatch } from 'services/batch';
import stores from 'stores';
import { FormErrMsg } from 'view/forms/utils';

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
export function CreateOrganizationForm() {
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

    if (!stores.userStore.user) {
      throw new Error('A signer is required to create an organization');
    } else {
      signer = stores.userStore.user.signer;
    }

    const action = createOrgAction({ ...org, id: makeOrgId(org.name) });
    const txns = new Array(createOrgTransaction(action, signer));
    const batchListBytes = createBatch(txns, signer);

    try {
      await submitBatch(batchListBytes);
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

          <CreateAddressForm
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
