import React from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import { FormProps } from 'view/forms';
import { Organization } from 'services/protobuf';

function createStore() {
  const store: consensource.Organization.IContact = {
    name: '',
    phone_number: '',
    language_code: '',
  };

  return store;
}

interface CreateContactFormProps extends FormProps {
  onSubmit: (contact: consensource.Organization.Contact) => any;
}

function CreateContactForm({
  onSubmit,
  onError,
  onSubmitBtnLabel = 'Create Contact',
}: CreateContactFormProps) {
  const state = useLocalStore(createStore);

  /**
   * Create an organization contact from the form info
   */
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const contact = new Organization.Contact(state);

      if (onSubmit) {
        onSubmit(contact);
      }
    } catch ({ message }) {
      if (onError) {
        onError(message);
      }
    }
  };

  const setState = <T extends keyof consensource.Organization.IContact>(
    key: T,
    val: consensource.Organization.IContact[T],
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

      <button type="submit" onClick={submit}>
        {onSubmitBtnLabel}
      </button>
    </form>
  );
}

export default observer(CreateContactForm);
