import React, { useState } from 'react';
import { hasEmptyFields } from 'view/forms/utils';
import {
  createFactoryAddress,
  IFactoryAddressStrict,
} from 'services/protobuf/organization';
import { Factory } from 'services/protobuf/compiled';
import {
  Button,
  Grid,
  TextField,
  TextFieldProps,
  Typography,
} from '@material-ui/core';

interface CreateFactoryAddressFormProps {
  onSubmit: (address: Factory.Address) => any;
  submitLabel?: string;
  existingAddress?: IFactoryAddressStrict;
}

/**
 * Form to create a `Factory.Address` proto object
 */
export const CreateFactoryAddressForm = ({
  onSubmit,
  submitLabel = 'Submit',
  existingAddress,
}: CreateFactoryAddressFormProps) => {
  const [address, setAddress] = useState<IFactoryAddressStrict>(
    existingAddress || {
      street_line_1: '',
      city: '',
      country: '',
    },
  );

  /**
   * Create a user and an agent from the form info
   */
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(createFactoryAddress(address));
  };

  const onChange = (
    event: Parameters<NonNullable<TextFieldProps['onChange']>>[0],
    key: keyof IFactoryAddressStrict,
  ) => {
    setAddress({ ...address, [key]: event.target.value });

    if (existingAddress) {
      submit(event);
    }
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h5">Address</Typography>
      </Grid>
      <Grid container item spacing={2}>
        <Grid container item justify="space-between" spacing={2}>
          <Grid item xs={6}>
            <TextField
              color="secondary"
              fullWidth
              value={address.street_line_1}
              onChange={(e) => onChange(e, 'street_line_1')}
              label="Street Line 1"
              id="street-line-1"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              color="secondary"
              fullWidth
              value={address.street_line_2}
              onChange={(e) => onChange(e, 'street_line_2')}
              label="Street Line 2"
              id="street-line-2"
            />
          </Grid>
        </Grid>
        <Grid container item justify="space-between" spacing={2}>
          <Grid item xs={6}>
            <TextField
              color="secondary"
              fullWidth
              value={address.city}
              onChange={(e) => onChange(e, 'city')}
              label="City"
              id="city"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              color="secondary"
              fullWidth
              value={address.postal_code || ''}
              onChange={(e) => onChange(e, 'postal_code')}
              label="Postal Code"
              id="postal-code"
            />
          </Grid>
        </Grid>
        <Grid container item justify="space-between" spacing={2}>
          <Grid item xs={6}>
            <TextField
              color="secondary"
              fullWidth
              value={address.state_province || ''}
              onChange={(e) => onChange(e, 'state_province')}
              label="State Province"
              id="state-province"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              color="secondary"
              fullWidth
              value={address.country}
              onChange={(e) => onChange(e, 'country')}
              label="Country"
              id="country"
              required
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        {!!existingAddress || (
          <Button
            color="secondary"
            type="submit"
            onClick={submit}
            disabled={hasEmptyFields(address)}
          >
            {submitLabel}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};
