import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { FactoryResAddressData } from 'services/api/factory';
import { makeStyles, createStyles } from '@material-ui/core/styles';

interface FactoryProfileAddress {
  address: FactoryResAddressData;
}

interface AddressInfoProps {
  title: string;
  val?: string;
}

const useStyles = makeStyles(
  createStyles({
    title: {
      fontWeight: 'bold',
    },
  }),
);

function AddressInfo({ title, val }: AddressInfoProps) {
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Typography variant="body1" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body2">{val || '-'}</Typography>
    </Grid>
  );
}
function FactoryProfileAddress({ address }: FactoryProfileAddress) {
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

      <Grid item xs={4}>
        <AddressInfo title="Country" val={country} />
      </Grid>
      <Grid item xs={4}>
        <AddressInfo title="City" val={city} />
      </Grid>
      <Grid item xs={4}>
        <AddressInfo title="State/Province" val={state_province} />
      </Grid>

      <Grid item xs={4}>
        <AddressInfo title="Street Line 1" val={street_line_1} />
      </Grid>
      <Grid item xs={4}>
        <AddressInfo title="Street Line 2" val={street_line_2} />
      </Grid>
      <Grid item xs={4}>
        <AddressInfo title="Postal Code" val={postal_code} />
      </Grid>
    </Grid>
  );
}

export { FactoryProfileAddress };
