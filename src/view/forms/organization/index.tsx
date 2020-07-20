import React, { useState } from 'react';
import { FormProps } from 'view/forms';
import {
  createOrgAction,
  ICreateOrgActionStrict,
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

function makeOrgId(name: string) {
  return hash(name, HashingAlgorithms.sha256);
}

export interface CreateOrganizationFormProps extends FormProps {
  organization_type: Organization.Type;
}

/**
 * Three-part form used to build a `CreateOrganizationAction` payload object
 * - First form is for the required Org Contact
 * - Second (optional) form is for Factrory Address (only required if
 *   organization_type === Organization.Type.FACTORY)
 * - Third form is for the Org name
 */
export default function CreateOrganizationForm({
  onSubmit,
  onSubmitBtnLabel = 'Create Organization',
  organization_type,
}: CreateOrganizationFormProps) {
  const [org, setOrg] = useState<ICreateOrgActionStrict>({
    contacts: [] as Organization.IContact[],
    address: null,
    name: '',
    id: '',
    organization_type: Organization.Type.UNSET_TYPE,
  });

  const isFactoryOrg = () => organization_type === Organization.Type.FACTORY;

  const onClick = async (event: React.FormEvent) => {
    event.preventDefault();
    const { contacts, address, name } = org;

    onSubmit(
      createOrgAction({
        contacts,
        address,
        name,
        id: makeOrgId(name),
        organization_type,
      }),
    );
  };

  const getCurrentFormTitle = () => {
    if (org.contacts.length === 0) {
      return 'Contact Info';
    }

    if (isFactoryOrg() && !org.address) {
      return 'Address Info';
    }

    return 'Organization Info';
  };

  const getCurrentForm = () => {
    if (org.contacts.length === 0) {
      return (
        <CreateContactForm
          onSubmit={(contacts) => setOrg({ ...org, contacts: [contacts] })}
          onSubmitBtnLabel="Continue"
        />
      );
    }

    if (isFactoryOrg() && !org.address) {
      return (
        <CreateAddressForm
          onSubmit={(address) => setOrg({ ...org, address })}
          onSubmitBtnLabel="Continue"
        />
      );
    }

    // Org info form
    return (
      <form>
        <Grid container>
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
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            onClick={onClick}
            disabled={!org.name}
            endIcon={<Key />}
          >
            {onSubmitBtnLabel}
          </Button>
        </Grid>
      </form>
    );
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5">{getCurrentFormTitle()}</Typography>
      </Grid>
      {getCurrentForm()}
    </Grid>
  );
}
