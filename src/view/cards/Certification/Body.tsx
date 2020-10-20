import React from 'react';
import { Grid, Typography, makeStyles, createStyles } from '@material-ui/core';
import { CertResData } from 'services/api';
import { AssignmentTurnedInOutlined as CheckIcon } from '@material-ui/icons';
import { getLocaleFromUnix } from 'utils';
import {
  ClaimedIconButton,
  WarningIconError,
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
    validToRow: {
      paddingLeft: 15,
    },
    claimedText: {
      paddingTop: 12.5,
    },
    validToIcon: {
      padding: '18px 16px 16px 16px !important',
    },
  }),
);

const ValidToText = ({ validTo }: ValidToTextProps) => {
  const classes = useStyles();

  const isValid = validTo >= Date.now();
  const text = isValid ? 'Valid until' : 'Expired on';

  return (
    <Grid container item spacing={4} className={classes.validToRow}>
      <Grid item xs={1} className={classes.validToIcon}>
        {isValid ? (
          <CheckIcon className={classes.success} />
        ) : (
          <WarningIconError />
        )}
      </Grid>
      <Grid item xs>
        <Typography variant="body1">{`${text} ${getLocaleFromUnix(
          validTo,
        )}`}</Typography>
      </Grid>
    </Grid>
  );
};

const IsClaimedText = ({ isClaimed }: IsClaimedTextProps) => {
  const classes = useStyles();

  return (
    <Grid container item spacing={4}>
      <Grid item xs={2}>
        {isClaimed ? <ClaimedIconButton /> : <UnclaimedIconButton />}
      </Grid>
      <Grid item xs>
        <Typography variant="body1" className={classes.claimedText}>
          {isClaimed ? 'Claimed' : 'Unclaimed'}
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

      <Grid container item>
        <IsClaimedText isClaimed={isClaimed} />
      </Grid>

      <Grid container item>
        <ValidToText validTo={validTo} />
      </Grid>
    </Grid>
  );
};
