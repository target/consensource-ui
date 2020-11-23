import React, { useEffect, useState } from 'react';
import { hasEmptyFields } from 'view/forms/utils';
import { IFactoryAddressStrict } from 'services/protobuf/organization';
import { Button, Grid, TextField, Typography } from '@material-ui/core';

interface CreateFactoryAddressFormProps {
  onSubmit?: (address: IFactoryAddressStrict) => void;
  onChange?: (contact: IFactoryAddressStrict) => void;
  submitLabel?: string;
  existingAddress?: IFactoryAddressStrict;
}

/**
 * Form to create a `Factory.Address` proto object
 */
export const CreateFactoryAddressForm = ({
  onSubmit,
  onChange,
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

    if (onSubmit) {
      onSubmit(address);
    }
  };

  useEffect(() => {
    /**
     * The `onChange` handler for each input will keep the internal
     * state of the form updated. If the parent also passes an `onChange`,
     * call that function to keep the parent in sync.
     */
    if (onChange) {
      onChange(address);
    }
  }, [address]);

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
              onChange={(e) =>
                setAddress({
                  ...address,
                  street_line_1: e.target.value,
                })
              }
              label="Street Line 1"
              id="street-line-1"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              color="secondary"
              fullWidth
              value={address.street_line_2}
              onChange={(e) =>
                setAddress({
                  ...address,
                  street_line_2: e.target.value,
                })
              }
              label="Street Line 2"
              id="street-line-2"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container item justify="space-between" spacing={2}>
          <Grid item xs={6}>
            <TextField
              color="secondary"
              fullWidth
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              label="City"
              id="city"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              color="secondary"
              fullWidth
              value={address.postal_code || ''}
              onChange={(e) =>
                setAddress({ ...address, postal_code: e.target.value })
              }
              label="Postal Code"
              id="postal-code"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container item justify="space-between" spacing={2}>
          <Grid item xs={6}>
            <TextField
              color="secondary"
              fullWidth
              value={address.state_province || ''}
              onChange={(e) =>
                setAddress({
                  ...address,
                  state_province: e.target.value,
                })
              }
              label="State Province"
              id="state-province"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              color="secondary"
              fullWidth
              value={address.country}
              onChange={(e) =>
                setAddress({ ...address, country: e.target.value })
              }
              label="Country"
              id="country"
              variant="outlined"
              required
            />
          </Grid>
        </Grid>
      </Grid>

      {onSubmit && (
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
      )}
    </Grid>
  );
};
