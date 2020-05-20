import React from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import { FormProps } from 'view/forms';
import createOrgTransaction from 'services/protobuf/transactions/organization';
import stores from 'stores';
import CreateContactForm from 'view/forms/CreateContactForm';
import CreateAddressForm from 'view/forms/CreateFactoryAddressForm';
import { Organization } from 'services/protobuf';
import { hash, HashingAlgorithms } from 'services/utils';
import createBatch from 'services/protobuf/batch';
import BatchService from 'services/batch';

function createStore() {
  const org = {
    contacts: null,
    address: null,
    name: null,
  } as consensource.ICreateOrganizationAction;

  return {
    org,
    errMsg: '',
  };
}

function makeOrgId(name: string) {
  return hash(name, HashingAlgorithms.sha256);
}

export interface CreateOrganizationFormProps extends FormProps {
  organizationType: consensource.Organization.Type;
}

function CreateOrganizationForm({
  onSubmit,
  onError,
  onSubmitBtnLabel = 'Create Organization',
  organizationType,
}: CreateOrganizationFormProps) {
  const state = useLocalStore(createStore);

  function isFactoryOrg() {
    return organizationType === Organization.Type.FACTORY;
  }

  async function onClick(event: React.FormEvent) {
    event.preventDefault();

    const { signer } = stores.userStore.user!; // TODO: Fix this non-nullable pattern
    const { contacts, address, name } = state.org;

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
      createOrgTransaction(
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

    try {
      await BatchService.submitBatch(batchListBytes);

      if (onSubmit) {
        onSubmit();
      }
    } catch ({ message }) {
      if (onError) {
        onError(message);
      }
    }
  }

  function onSubmitContact(contact: consensource.Organization.Contact) {
    state.org.contacts = new Array(contact);
  }

  function onSubmitAddress(address: consensource.Factory.Address) {
    state.org.address = address;
  }

  function setOrgName(val: string) {
    state.org.name = val;
  }

  function onAddressOrContactError(err: string) {
    state.errMsg = err;
  }

  function getCurrentFormTitle() {
    const { org } = state;

    if (!org.contacts) {
      return 'Contact Info';
    }

    if (isFactoryOrg() && !org.address) {
      return 'Address Info';
    }

    return 'Organization Info';
  }

  function getCurrentForm() {
    const { org } = state;

    if (!org.contacts) {
      return (
        <CreateContactForm
          onSubmit={onSubmitContact}
          onError={onAddressOrContactError}
          onSubmitBtnLabel="Next"
        />
      );
    }

    if (isFactoryOrg() && !org.address) {
      return (
        <CreateAddressForm
          onSubmit={onSubmitAddress}
          onError={onAddressOrContactError}
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
              value={org.name || ''}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="name"
              type="text"
              id="factory-name"
              required
            />
          </label>
        </div>
        <button type="submit" onClick={onClick}>
          {onSubmitBtnLabel}
        </button>
      </form>
    );
  }

  return (
    <div>
      <h1>{getCurrentFormTitle()}</h1>
      <div>{state.errMsg}</div>
      {getCurrentForm()}
    </div>
  );
}

export default observer(CreateOrganizationForm);
