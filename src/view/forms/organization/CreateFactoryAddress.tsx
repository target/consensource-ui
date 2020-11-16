import React, { useState } from 'react';
import { hasEmptyFields } from 'view/forms/utils';
import {
  createFactoryAddress,
  IFactoryAddressStrict,
} from 'services/protobuf/organization';
import { Factory } from 'services/protobuf/compiled';
import { Button, Grid, TextField, Typography } from '@material-ui/core';

interface CreateFactoryAddressFormProps {
  onSubmit: (address: Factory.Address) => any;
  submitLabel?: string;
  existing_address?: IFactoryAddressStrict;
}

/**
 * Form to create a `Factory.Address` proto object
 */
export const CreateFactoryAddressForm = ({
  onSubmit,
  submitLabel = 'Submit',
  existing_address,
}: CreateFactoryAddressFormProps) => {
  const [address, setAddress] = useState<IFactoryAddressStrict>(
    existing_address || {
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
    console.log('ADDRESS ', address);
    onSubmit(createFactoryAddress(address));
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h6">Address Info</Typography>
      </Grid>
      <Grid item>
        <Grid item>
          <TextField
            color="secondary"
            value={address.street_line_1}
            onChange={(e) => {
              setAddress({ ...address, street_line_1: e.target.value });
              if (existing_address) onSubmit(createFactoryAddress(address));
            }}
            label="Street Line 1"
            id="street-line-1"
            required
          />
        </Grid>
        <Grid item>
          <TextField
            color="secondary"
            value={address.street_line_2}
            onChange={(e) => {
              setAddress({ ...address, street_line_2: e.target.value });
              if (existing_address) onSubmit(createFactoryAddress(address));
            }}
            label="Street Line 2"
            id="street-line-2"
          />
        </Grid>
        <Grid item>
          <TextField
            color="secondary"
            value={address.city}
            onChange={(e) => {
              setAddress({ ...address, city: e.target.value });
              if (existing_address) onSubmit(createFactoryAddress(address));
            }}
            label="City"
            id="city"
            required
          />
        </Grid>
        <Grid item>
          <TextField
            color="secondary"
            value={address.state_province || ''}
            onChange={(e) => {
              setAddress({ ...address, state_province: e.target.value });
              if (existing_address) onSubmit(createFactoryAddress(address));
            }}
            label="State Province"
            id="state-province"
          />
        </Grid>
        <Grid item>
          <TextField
            color="secondary"
            value={address.country}
            onChange={(e) => {
              setAddress({ ...address, country: e.target.value });
              if (existing_address) onSubmit(createFactoryAddress(address));
            }}
            label="Country"
            id="country"
            required
          />
        </Grid>
        <Grid item>
          <TextField
            color="secondary"
            value={address.postal_code || ''}
            onChange={(e) => {
              setAddress({ ...address, postal_code: e.target.value });
              if (existing_address) onSubmit(createFactoryAddress(address));
            }}
            label="Postal Code"
            id="postal-code"
          />
        </Grid>
      </Grid>

      <Grid item>
        {!!existing_address || (
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
