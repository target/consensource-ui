import React, { useState } from 'react';
import { hasEmptyFields } from 'view/forms/utils';
import {
  createOrgContact,
  IContactStrict,
} from 'services/protobuf/organization';
import { Organization } from 'services/protobuf/compiled';
import { Grid, TextField, Button } from '@material-ui/core';

interface CreateContactFormProps {
  onSubmit: (contact: Organization.Contact) => any;
  submitLabel?: string;
}

/**
 * Form to create a `Organization.Contact` proto object
 */
export const CreateContactForm = ({
  onSubmit,
  submitLabel = 'Create Contact',
}: CreateContactFormProps) => {
  const [contact, setContact] = useState<IContactStrict>({
    name: '',
    phone_number: '',
    language_code: '',
  });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(createOrgContact(contact));
  };

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            color="secondary"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            label="Name"
            id="contact-name"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="secondary"
            value={contact.phone_number}
            onChange={(e) =>
              setContact({ ...contact, phone_number: e.target.value })
            }
            label="Phone Number"
            id="contact-phone-number"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="secondary"
            value={contact.language_code}
            onChange={(e) =>
              setContact({ ...contact, language_code: e.target.value })
            }
            label="Language Code"
            id="contact-language-code"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            color="secondary"
            onClick={submit}
            disabled={hasEmptyFields(contact)}
          >
            {submitLabel}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
