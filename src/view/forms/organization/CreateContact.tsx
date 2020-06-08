import React from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import { FormProps, hasEmptyFields } from 'view/forms';
import { createOrgContact } from 'services/protobuf/organization';
import { Organization } from 'services/protobuf/compiled';

function createStore() {
  const store: Organization.IContact = {
    name: '',
    phone_number: '',
    language_code: '',
  };

  return store;
}

interface CreateContactFormProps extends FormProps {
  onSubmit: (contact: Organization.Contact) => any;
}

/**
 * Form to create a `Organization.Contact` proto object
 */
function CreateContactForm({
  onSubmit,
  onSubmitBtnLabel = 'Create Contact',
}: CreateContactFormProps) {
  const state = useLocalStore(createStore);
  const isDisabled = hasEmptyFields(state);

  /**
   * Create an organization contact from the form info
   */
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(createOrgContact(state));
  };

  const setState = <T extends keyof Organization.IContact>(
    key: T,
    val: Organization.IContact[T],
  ) => {
    state[key] = val;
  };

  return (
    <form>
      <div>
        <label htmlFor="contact-name">
          name
          <input
            value={state.name || ''}
            onChange={(e) => setState('name', e.target.value)}
            placeholder="Name"
            type="text"
            id="contact-name"
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="contact-phone-number">
          Phone Number
          <input
            value={state.phone_number || ''}
            onChange={(e) => setState('phone_number', e.target.value)}
            placeholder="Phone Number"
            type="text"
            id="contact-phone-number"
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="contact-language-code">
          Language Code
          <input
            value={state.language_code || ''}
            onChange={(e) => setState('language_code', e.target.value)}
            placeholder="Language Code"
            type="text"
            id="contact-language-code"
            required
          />
        </label>
      </div>

      <button type="submit" onClick={submit} disabled={isDisabled}>
        {onSubmitBtnLabel}
      </button>
    </form>
  );
}

export default observer(CreateContactForm);
