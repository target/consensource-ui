import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { FactoryResAddressData } from 'services/api/factory';
import { InfoItem } from 'view/components';

interface FactoryProfileAddress {
  address: FactoryResAddressData;
}

export function FactoryProfileAddress({ address }: FactoryProfileAddress) {
  const {
    street_line_1,
    street_line_2,
    city,
    state_province,
    country,
    postal_code,
  } = address;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Address</Typography>
      </Grid>

      <InfoItem title="Country" val={country} />
      <InfoItem title="City" val={city} />
      <InfoItem title="State/Province" val={state_province} />
      <InfoItem title="Street Line 1" val={street_line_1} />
      <InfoItem title="Street Line 2" val={street_line_2} />
      <InfoItem title="Postal Code" val={postal_code} />
    </Grid>
  );
}
