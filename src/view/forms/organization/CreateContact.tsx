import React, { useEffect, useState } from 'react';
import { hasEmptyFields } from 'view/forms/utils';
import { IContactStrict } from 'services/protobuf/organization';
import { Grid, TextField, Button, Typography } from '@material-ui/core';

interface CreateContactFormProps {
  onSubmit?: (contact: IContactStrict) => void;
  onChange?: (contact: IContactStrict) => void;
  submitLabel?: string;
  existingContact?: IContactStrict;
}

/**
 * Form to create a `Organization.Contact` proto object
 */
export const CreateContactForm = ({
  onSubmit,
  onChange,
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

    if (onSubmit) {
      onSubmit(contact);
    }
  };

  useEffect(() => {
    /**
     * The `onChange` handler for each input will keep the internal
     * state of the form updated. If the parent also passes an `onChange`,
     * call that function to keep the parent in sync.
     */
    if (onChange) {
      onChange(contact);
    }
  }, [contact]);

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
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
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
            onChange={(e) =>
              setContact({ ...contact, phone_number: e.target.value })
            }
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
            onChange={(e) =>
              setContact({ ...contact, language_code: e.target.value })
            }
            label="Language Code"
            id="contact-language-code"
            variant="outlined"
            required
          />
        </Grid>
      </Grid>

      {onSubmit && (
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
