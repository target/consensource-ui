import React, { useState } from 'react';
import {
  createOrgAction,
  ICreateOrgActionStrict,
  createOrgTransaction,
  updateOrgAction,
  updateOrgTransaction,
  IContactStrict,
  IFactoryAddressStrict,
} from 'services/protobuf/organization';
import {
  createTransferAssertionAction,
  createTransferAssertionActionTransaction,
} from 'services/protobuf/assertion';
import {
  Organization,
  IUpdateOrganizationAction,
} from 'services/protobuf/compiled';
import { hasOwnPropertySafe } from 'utils';
import { VpnKey as Key } from '@material-ui/icons';
import { Button, Typography, Grid, TextField } from '@material-ui/core';
import { SelectOrganizationType } from 'view/forms/organization/SelectOrganizationType';
import { createBatch } from 'services/protobuf/batch';
import { useAuth } from 'services/hooks';
import { FormErrMsg, TransactionFormProps } from 'view/forms/utils';
import { postBatches, FactoryResData } from 'services/api';
import { getSignerPubKeyHex } from 'services/crypto';
import { CreateContactForm } from './CreateContact';
import { CreateFactoryAddressForm } from './CreateFactoryAddress';

export interface OrgTransactionFormProps extends TransactionFormProps {
  existingOrg: FactoryResData;
}

export interface IUpdateOrganizationActionStrict
  extends IUpdateOrganizationAction {
  contacts: NonNullable<IContactStrict[]>;
  address: NonNullable<IFactoryAddressStrict>;
}

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
        <form>
          <CreateContactForm
            onSubmit={(contacts) => setOrg({ ...org, contacts: [contacts] })}
            submitLabel="Continue"
          />
        </form>
      );
    }

    if (org.organization_type === Organization.Type.FACTORY && !org.address) {
      return (
        <form>
          <CreateFactoryAddressForm
            onSubmit={(address) => setOrg({ ...org, address })}
            submitLabel="Continue"
          />
        </form>
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

/**
 * One-part form used to build an `UpdateOrganizationAction` payload object
 */
export const UpdateOrganizationForm = ({
  existingOrg,
  setBatchStatusLink,
}: OrgTransactionFormProps) => {
  const { signer } = useAuth();
  const [errMsg, setErrMsg] = useState('');
  const [org, setOrg] = useState<IUpdateOrganizationActionStrict>({
    contacts: existingOrg.contacts as IContactStrict[],
    address: existingOrg.address as IFactoryAddressStrict,
  });

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const txns = [];
    if (
      existingOrg.assertion_id &&
      hasOwnPropertySafe(existingOrg, 'assertion_id')
    ) {
      const transfer_action = createTransferAssertionAction({
        assertion_id: existingOrg.assertion_id,
        new_owner_public_key: getSignerPubKeyHex(signer),
      });
      txns.push(
        createTransferAssertionActionTransaction(transfer_action, signer),
      );
    }

    const action = updateOrgAction({ ...existingOrg, ...org });
    txns.push(updateOrgTransaction(action, signer, existingOrg.id));
    const batchListBytes = createBatch(txns, signer);

    try {
      const { link } = await postBatches(batchListBytes);
      setBatchStatusLink(link);
    } catch ({ message }) {
      setErrMsg(message);
    }
  };

  return (
    <form>
      <Grid container direction="column" spacing={2}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <FormErrMsg msg={errMsg} />
          </Grid>

          <Grid item>
            <Typography variant="h5">Organization</Typography>
          </Grid>

          <Grid item>
            <TextField
              color="secondary"
              fullWidth
              value={existingOrg.name}
              label="Factory Name"
              id="org-name"
              variant="outlined"
              disabled
            />
          </Grid>
        </Grid>

        <Grid item />

        <CreateFactoryAddressForm
          onSubmit={(address) => setOrg({ ...org, address })}
          submitLabel="Continue"
          existingAddress={org.address}
        />
        <CreateContactForm
          onSubmit={(contacts) => setOrg({ ...org, contacts: [contacts] })}
          submitLabel="Continue"
          existingContact={org.contacts[0]}
        />

        <Grid item>
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            fullWidth
            onClick={submit}
            disabled={!org.contacts && !org.address}
          >
            Claim Factory
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
