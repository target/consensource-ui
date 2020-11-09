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
}

/**
 * Form to create a `Factory.Address` proto object
 */
export const CreateFactoryAddressForm = ({
  onSubmit,
  submitLabel = 'Submit',
}: CreateFactoryAddressFormProps) => {
  const [address, setAddress] = useState<IFactoryAddressStrict>({
    street_line_1: '',
    city: '',
    country: '',
  });

  /**
   * Create a user and an agent from the form info
   */
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(createFactoryAddress(address));
  };

  return (
    <form>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h6">Address Info</Typography>
        </Grid>
        <Grid item>
          <Grid item>
            <TextField
              color="secondary"
              value={address.street_line_1}
              onChange={(e) =>
                setAddress({ ...address, street_line_1: e.target.value })
              }
              label="Street Line 1"
              id="street-line-1"
              required
            />
          </Grid>
          <Grid item>
            <TextField
              color="secondary"
              value={address.street_line_2}
              onChange={(e) =>
                setAddress({ ...address, street_line_2: e.target.value })
              }
              label="Street Line 2"
              id="street-line-2"
            />
          </Grid>
          <Grid item>
            <TextField
              color="secondary"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              label="City"
              id="city"
              required
            />
          </Grid>
          <Grid item>
            <TextField
              color="secondary"
              value={address.state_province || ''}
              onChange={(e) =>
                setAddress({ ...address, state_province: e.target.value })
              }
              label="State Province"
              id="state-province"
            />
          </Grid>
          <Grid item>
            <TextField
              color="secondary"
              value={address.country}
              onChange={(e) =>
                setAddress({ ...address, country: e.target.value })
              }
              label="Country"
              id="country"
              required
            />
          </Grid>
          <Grid item>
            <TextField
              color="secondary"
              value={address.postal_code || ''}
              onChange={(e) =>
                setAddress({ ...address, postal_code: e.target.value })
              }
              label="Postal Code"
              id="postal-code"
            />
          </Grid>
        </Grid>

        <Grid item>
          <Button
            color="secondary"
            type="submit"
            onClick={submit}
            disabled={hasEmptyFields(address)}
          >
            {submitLabel}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
