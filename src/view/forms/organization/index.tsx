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
          onSubmitBtnLabel="Next"
        />
      );
    }

    if (isFactoryOrg() && !org.address) {
      return (
        <CreateAddressForm
          onSubmit={(address) => setOrg({ ...org, address })}
          onSubmitBtnLabel="Next"
        />
      );
    }

    // Org info form
    return (
      <form>
        <div>
          <label htmlFor="factory-name">
            name
            <input
              value={org.name}
              onChange={(e) => setOrg({ ...org, name: e.target.value })}
              placeholder="Organization name"
              type="text"
              id="factory-name"
              required
            />
          </label>
        </div>
        <button type="submit" onClick={onClick} disabled={false}>
          {onSubmitBtnLabel}
        </button>
      </form>
    );
  };

  return (
    <div>
      <h3>{getCurrentFormTitle()}</h3>
      {getCurrentForm()}
    </div>
  );
}
