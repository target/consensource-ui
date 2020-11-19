import React, { useState } from 'react';
import { hasEmptyFields } from 'view/forms/utils';
import {
  createOrgContact,
  IContactStrict,
} from 'services/protobuf/organization';
import { Organization } from 'services/protobuf/compiled';
import {
  Grid,
  TextField,
  TextFieldProps,
  Button,
  Typography,
} from '@material-ui/core';

interface CreateContactFormProps {
  onSubmit: (contact: Organization.Contact) => any;
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
    onSubmit(createOrgContact(contact));
  };

  const onChange = (
    event: Parameters<NonNullable<TextFieldProps['onChange']>>[0],
    key: keyof IContactStrict,
  ) => {
    setContact({ ...contact, [key]: event.target.value });

    if (existingContact) {
      submit(event);
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

      <Grid item>
        {!!existingContact || (
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
