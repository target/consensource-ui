import React, { useState } from 'react';
import { hasEmptyFields, onChangeEvent } from 'view/forms/utils';
import { IContactStrict } from 'services/protobuf/organization';
import { Grid, TextField, Button, Typography } from '@material-ui/core';

interface CreateContactFormProps {
  onSubmit: (contact: IContactStrict) => any;
  submitLabel?: string;
  existingContact?: IContactStrict;
}

/**
 * Form to create a `Organization.Contact` proto object
 */
export const CreateContactForm = ({
  onSubmit,
  submitLabel = 'Submit',
  existingContact,
}: CreateContactFormProps) => {
  const [contact, setContact] = useState<IContactStrict>(
    existingContact || {
      name: '',
      phone_number: '',
      language_code: '',
    },
  );

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(contact);
  };

  const onChange = (event: onChangeEvent, key: keyof IContactStrict) => {
    setContact({ ...contact, [key]: event.target.value });

    if (existingContact) {
      onSubmit({ ...contact, [key]: event.target.value });
    }
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
            onChange={(e) => onChange(e, 'name')}
            label="Name"
            id="contact-name"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item>
          <TextField
            color="secondary"
            value={contact.phone_number}
            onChange={(e) => onChange(e, 'phone_number')}
            label="Phone Number"
            id="contact-phone-number"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item>
          <TextField
            color="secondary"
            value={contact.language_code}
            onChange={(e) => onChange(e, 'language_code')}
            label="Language Code"
            id="contact-language-code"
            variant="outlined"
            required
          />
        </Grid>
      </Grid>

      {!!existingContact || (
        <Grid item>
          <Button
            type="submit"
            color="secondary"
            onClick={submit}
            disabled={hasEmptyFields(contact)}
          >
            {submitLabel}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};
