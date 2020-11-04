import React from 'react';
import { Grid, Typography, makeStyles, createStyles } from '@material-ui/core';
import { CertResData } from 'services/api';
import { getLocaleFromUnix } from 'utils';
import {
  CheckIcon,
  WarningIcon,
  ClaimedIconButton,
  UnclaimedIconButton,
} from 'view/components';

export interface BodyProps {
  validTo: CertResData['valid_to'];
  isClaimed: boolean;
}

export interface ValidToTextProps {
  validTo: BodyProps['validTo'];
}

export interface IsClaimedTextProps {
  isClaimed: BodyProps['isClaimed'];
}

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    success: {
      color: palette.success.main,
    },
    warning: {
      color: palette.warning.main,
    },
    claimedText: {
      paddingTop: 12.5,
    },
    claimedBtn: {
      marginLeft: 2.5,
    },
    validToIcon: {
      padding: '18px 16px 16px 16px !important',
    },
    validToText: {
      marginLeft: 5,
    },
    validToRow: {
      paddingLeft: 15,
    },
  }),
);

const ValidToText = ({ validTo }: ValidToTextProps) => {
  const classes = useStyles();

  const validToMs = validTo * 1000;
  const isValid = validToMs >= Date.now();
  const text = isValid ? 'Valid until' : 'Expired on';

  return (
    <Grid container item spacing={4} className={classes.validToRow}>
      <Grid item xs={1} className={classes.validToIcon}>
        {isValid ? (
          <CheckIcon className={classes.success} />
        ) : (
          <WarningIcon color="error" />
        )}
      </Grid>
      <Grid item xs>
        <Typography
          variant="body1"
          className={classes.validToText}
        >{`${text} ${getLocaleFromUnix(validToMs)}`}</Typography>
      </Grid>
    </Grid>
  );
};

const IsClaimedText = ({ isClaimed }: IsClaimedTextProps) => {
  const classes = useStyles();
  const isClaimedText = isClaimed ? 'Claimed' : 'Unclaimed';

  return (
    <Grid container item spacing={6}>
      <Grid item xs={2} className={classes.claimedBtn}>
        {isClaimed ? <ClaimedIconButton /> : <UnclaimedIconButton />}
      </Grid>
      <Grid item xs>
        <Typography variant="body1" className={classes.claimedText}>
          {isClaimedText}
        </Typography>
      </Grid>
    </Grid>
  );
};

export const Body = ({ validTo, isClaimed }: BodyProps) => {
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography align="center" color="textSecondary">
          <i>Description</i>
        </Typography>
      </Grid>

      <Grid item>
        <IsClaimedText isClaimed={isClaimed} />
      </Grid>

      <Grid item>
        <ValidToText validTo={validTo} />
      </Grid>
    </Grid>
  );
};
