import React, { useState } from 'react';
import { FormProps, hasEmptyFields } from 'view/widgets/forms';
import {
  createOrgContact,
  IContactStrict,
} from 'services/protobuf/organization';
import { Organization } from 'services/protobuf/compiled';

interface CreateContactFormProps extends FormProps {
  onSubmit: (contact: Organization.Contact) => any;
}

/**
 * Form to create a `Organization.Contact` proto object
 */
export default function CreateContactForm({
  onSubmit,
  onSubmitBtnLabel = 'Create Contact',
}: CreateContactFormProps) {
  const [contact, setContact] = useState<IContactStrict>({
    name: '',
    phone_number: '',
    language_code: '',
  });

  /**
   * Create an organization contact from the form info
   */
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(createOrgContact(contact));
  };

  return (
    <form>
      <div>
        <label htmlFor="contact-name">
          name
          <input
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
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
            value={contact.phone_number}
            onChange={(e) =>
              setContact({ ...contact, phone_number: e.target.value })
            }
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
            value={contact.language_code}
            onChange={(e) =>
              setContact({ ...contact, language_code: e.target.value })
            }
            placeholder="Language Code"
            type="text"
            id="contact-language-code"
            required
          />
        </label>
      </div>

      <button type="submit" onClick={submit} disabled={hasEmptyFields(contact)}>
        {onSubmitBtnLabel}
      </button>
    </form>
  );
}
