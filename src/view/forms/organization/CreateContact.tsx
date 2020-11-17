import React, { useState } from 'react';
import { hasEmptyFields } from 'view/forms/utils';
import {
  createOrgContact,
  IContactStrict,
} from 'services/protobuf/organization';
import { Organization } from 'services/protobuf/compiled';
import { Grid, TextField, Button, Typography } from '@material-ui/core';

interface CreateContactFormProps {
  onSubmit: (contact: Organization.Contact) => any;
  submitLabel?: string;
  existing_contact?: IContactStrict;
}

/**
 * Form to create a `Organization.Contact` proto object
 */
export const CreateContactForm = ({
  onSubmit,
  submitLabel = 'Submit',
  existing_contact,
}: CreateContactFormProps) => {
  const [contact, setContact] = useState<IContactStrict>(
    existing_contact || {
      name: '',
      phone_number: '',
      language_code: '',
    },
  );

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(createOrgContact(contact));
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h5">Contact</Typography>
      </Grid>
      <Grid container item spacing={2}>
        <Grid item>
          <TextField
            color="secondary"
            value={contact.name}
            onChange={(e) => {
              setContact({ ...contact, name: e.target.value });
              if (existing_contact) onSubmit(createOrgContact(contact));
            }}
            label="Name"
            id="contact-name"
            required
          />
        </Grid>
        <Grid item>
          <TextField
            color="secondary"
            value={contact.phone_number}
            onChange={(e) => {
              setContact({ ...contact, phone_number: e.target.value });
              if (existing_contact) onSubmit(createOrgContact(contact));
            }}
            label="Phone Number"
            id="contact-phone-number"
            required
          />
        </Grid>
        <Grid item>
          <TextField
            color="secondary"
            value={contact.language_code}
            onChange={(e) => {
              setContact({ ...contact, language_code: e.target.value });
              if (existing_contact) onSubmit(createOrgContact(contact));
            }}
            label="Language Code"
            id="contact-language-code"
            required
          />
        </Grid>
      </Grid>

      <Grid item>
        {!!existing_contact || (
          <Button
            type="submit"
            color="secondary"
            onClick={submit}
            disabled={hasEmptyFields(contact)}
          >
            {submitLabel}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
