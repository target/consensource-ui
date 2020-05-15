import React from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import { FormProps } from 'view/forms';
import { Organization } from 'services/protobuf';

function createStore() {
  return {
    name: '',
    phoneNumber: '',
    languageCode: '',
  } as consensource.Organization.IContact;
}

interface CreateContactFormProps extends FormProps {
  onSubmit: (contact: consensource.Organization.Contact) => any;
}

function CreateContactForm({
  onSubmit,
  onSubmitBtnLabel,
}: CreateContactFormProps) {
  const state = useLocalStore(createStore);

  /**
   * Create an organization contact from the form info
   */
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    const contact = new Organization.Contact(state);

    if (onSubmit) {
      onSubmit(contact);
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
            placeholder="name"
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
            value={state.phoneNumber || ''}
            onChange={(e) => setState('phoneNumber', e.target.value)}
            placeholder="phoneNumber"
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
            value={state.languageCode || ''}
            onChange={(e) => setState('languageCode', e.target.value)}
            placeholder="languageCode"
            type="text"
            id="contact-language-code"
            required
          />
        </label>
      </div>

      <button type="submit" onClick={submit}>
        {onSubmitBtnLabel || 'Create Contact'}
      </button>
    </form>
  );
}

export default observer(CreateContactForm);
