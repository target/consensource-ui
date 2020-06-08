import React from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import { FormProps, hasEmptyFields } from 'view/forms';
import {
  createOrgAction,
  ICreateOrgActionStrict,
} from 'services/protobuf/organization';
import CreateContactForm from 'view/forms/organization/CreateContact';
import CreateAddressForm from 'view/forms/organization/CreateFactoryAddress';
import { Organization, Factory } from 'services/protobuf/compiled';
import { hash, HashingAlgorithms } from 'services/utils';

function createStore() {
  const org: ICreateOrgActionStrict = {
    contacts: [] as Organization.IContact[],
    address: null,
    name: '',
    id: '',
    organization_type: Organization.Type.UNSET_TYPE,
  };

  return {
    org,
    errMsg: '',
  };
}

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
function CreateOrganizationForm({
  onSubmit,
  onSubmitBtnLabel = 'Create Organization',
  organization_type,
}: CreateOrganizationFormProps) {
  const state = useLocalStore(createStore);
  const isDisabled = hasEmptyFields(state);

  const isFactoryOrg = () => organization_type === Organization.Type.FACTORY;

  const onClick = async (event: React.FormEvent) => {
    event.preventDefault();
    const { contacts, address, name } = state.org;

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

  const onSubmitContact = (contact: Organization.Contact) => {
    state.org.contacts = new Array(contact);
  };

  const onSubmitAddress = (address: Factory.Address) => {
    state.org.address = address;
  };

  const setOrgName = (val: string) => {
    state.org.name = val;
  };

  const getCurrentFormTitle = () => {
    const { org } = state;

    if (!org.contacts) {
      return 'Contact Info';
    }

    if (isFactoryOrg() && !org.address) {
      return 'Address Info';
    }

    return 'Organization Info';
  };

  const getCurrentForm = () => {
    const { org } = state;

    if (!org.contacts) {
      return (
        <CreateContactForm onSubmit={onSubmitContact} onSubmitBtnLabel="Next" />
      );
    }

    if (isFactoryOrg() && !org.address) {
      return (
        <CreateAddressForm onSubmit={onSubmitAddress} onSubmitBtnLabel="Next" />
      );
    }

    // Org info form
    return (
      <form>
        <div>
          <label htmlFor="factory-name">
            name
            <input
              value={org.name || ''}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Organization name"
              type="text"
              id="factory-name"
              required
            />
          </label>
        </div>
        <button type="submit" onClick={onClick} disabled={isDisabled}>
          {onSubmitBtnLabel}
        </button>
      </form>
    );
  };

  return (
    <div>
      <h1>{getCurrentFormTitle()}</h1>
      <div>{state.errMsg}</div>
      {getCurrentForm()}
    </div>
  );
}

export default observer(CreateOrganizationForm);
