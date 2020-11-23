import React from 'react';
import { Grid } from '@material-ui/core';
import { CertResData } from 'services/api';
import { Link, SubtitleText } from 'view/components';

export interface HeaderProps {
  certificate: CertResData;
}

export const GrantedToSubtitle = ({
  certificate: { factory_name, factory_id },
}: HeaderProps) => {
  return (
    <Grid container item justify="center" spacing={1}>
      <Grid item>
        <SubtitleText>
          Granted to:{' '}
          <Link
            to={`/factories/${factory_id}`}
            color="secondary"
            align="center"
          >
            {factory_name}
          </Link>
        </SubtitleText>
      </Grid>
    </Grid>
  );
};
