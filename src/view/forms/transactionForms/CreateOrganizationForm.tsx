import React from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import { FormProps } from 'view/forms';
import TransactionForm from 'view/forms/transactionForms';
import createOrganizationTransaction from 'services/protobuf/transactions/organization';
import stores from 'stores';
import CreateContactForm from 'view/forms/CreateContactForm';
import CreateAddressForm from 'view/forms/CreateFactoryAddressForm';
import { Organization } from 'services/protobuf';
import { hash, HashingAlgorithms } from 'services/utils';

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

  const createTxnsFn = () => {
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

    const txn = createOrganizationTransaction(
      {
        contacts,
        address,
        name,
        id: makeOrgId(name),
        organizationType,
      },
      signer,
    );

    return [txn];
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
      <TransactionForm createTxnsFn={createTxnsFn} onSuccess={onSubmit}>
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
      </TransactionForm>
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
