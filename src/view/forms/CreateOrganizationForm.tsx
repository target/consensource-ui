import React from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import { FormProps } from 'view/forms';
import createOrganizationTransaction from 'services/protobuf/transactions/organization';
import stores from 'stores';
import CreateContactForm from 'view/forms/CreateContactForm';
import CreateAddressForm from 'view/forms/CreateFactoryAddressForm';
import { Organization } from 'services/protobuf';
import { hash, HashingAlgorithms } from 'services/utils';
import createBatch from 'services/protobuf/batch';

function createStore() {
  return {
    contacts: null,
    address: null,
    name: null,
  } as consensource.ICreateOrganizationAction;
}

function makeOrgId(name: string) {
  return hash(name, HashingAlgorithms.sha256);
}

export interface CreateOrganizationFormProps extends FormProps {
  organizationType: consensource.Organization.Type;
}

function CreateOrganizationForm({
  onSubmit,
  organizationType,
}: CreateOrganizationFormProps) {
  const state = useLocalStore(createStore);

  const isFactoryOrg = () => organizationType === Organization.Type.FACTORY;

  const onClick = async (event: React.FormEvent) => {
    event.preventDefault();

    const { signer } = stores.userStore.user!; // TODO: Fix this non-nullable pattern
    const { contacts, address, name } = state;

    if (!contacts) {
      throw new Error(
        `A contact is required to create a ${organizationType} transaction`,
      );
    }

    if (isFactoryOrg() && !address) {
      throw new Error(
        `An address is required to create a ${organizationType} transaction`,
      );
    }

    if (!name) {
      throw new Error(
        `An organization name is required to create a ${organizationType} transaction`,
      );
    }

    const txns = new Array(
      createOrganizationTransaction(
        {
          contacts,
          address,
          name,
          id: makeOrgId(name),
          organizationType,
        },
        signer,
      ),
    );

    const batchListBytes = createBatch(txns, signer);

    await stores.batchStore.submitBatch(batchListBytes);

    if (onSubmit) {
      onSubmit();
    }
  };

  const onSubmitContact = (contact: consensource.Organization.Contact) => {
    state.contacts = new Array(contact);
  };

  const onSubmitAddress = (address: consensource.Factory.Address) => {
    state.address = address;
  };

  const setName = (val: string) => {
    state.name = val;
  };

  const getCurrentFormTitle = () => {
    if (!state.contacts) {
      return 'Contact Info';
    }

    if (isFactoryOrg() && !state.address) {
      return 'Address Info';
    }

    return 'Organization Info';
  };

  const getCurrentForm = () => {
    if (!state.contacts) {
      return (
        <CreateContactForm onSubmit={onSubmitContact} onSubmitBtnLabel="Next" />
      );
    }

    if (isFactoryOrg() && !state.address) {
      return (
        <CreateAddressForm onSubmit={onSubmitAddress} onSubmitBtnLabel="Next" />
      );
    }

    return (
      <form>
        <div>
          <label htmlFor="factory-name">
            name
            <input
              value={state.name || ''}
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
              type="text"
              id="factory-name"
              required
            />
          </label>
        </div>
        <button type="submit" onClick={onClick}>
          Create Organization
        </button>
      </form>
    );
  };

  return (
    <div>
      <h1>{getCurrentFormTitle()}</h1>
      {getCurrentForm()}
    </div>
  );
}

export default observer(CreateOrganizationForm);
