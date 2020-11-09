import React from 'react';
import { Grid, Typography, makeStyles, createStyles } from '@material-ui/core';
import { UnstyledLink } from 'view/components';
import { SubtitleText } from 'view/components/Claims/ClaimableDataPageHeader/SubtitleText';
import { CertResData } from 'services/api';

export interface HeaderProps {
  certificate: CertResData;
}

// TODO: Make a generic styled link component
const useStyles = makeStyles(({ palette }) =>
  createStyles({
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
    certName: {
      borderBottom: `2px solid ${palette.primary.light}`,
      cursor: 'pointer',
      '&:hover': {
        borderBottom: `2px solid ${palette.primary.main}`,
      },
    },
  }),
);

export const GrantedToSubtitle = ({
  certificate: { factory_name, factory_id },
}: HeaderProps) => {
  const classes = useStyles();

  return (
    <Grid container item justify="center" spacing={1}>
      <Grid item>
        <SubtitleText>Granted to:</SubtitleText>
      </Grid>
      <Grid item>
        <UnstyledLink to={`/factories/${factory_id}`}>
          <Typography
            color="textSecondary"
            align="center"
            className={classes.certName}
          >
            {factory_name}
          </Typography>
        </UnstyledLink>
      </Grid>
    </Grid>
  );
};
