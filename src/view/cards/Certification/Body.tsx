import React from 'react';
import { Grid, Typography, makeStyles, createStyles } from '@material-ui/core';
import { CertResData } from 'services/api';
import { getLocaleFromUnix, getUnixTimeSec } from 'utils';
import {
  AssignmentTurnedInOutlined as CheckIcon,
  Warning as WarningIcon,
  VerifiedUserOutlined as ClaimedIcon,
  InfoOutlined as UnclaimedIcon,
} from 'view/components';

export interface BodyProps {
  validTo: CertResData['valid_to'];
  isClaimed: boolean;
}
export interface BodyRowProps {
  text: string;
  icon: JSX.Element;
}

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    success: {
      color: palette.success.main,
    },
    info: {
      color: palette.info.main,
    },
  }),
);

const BodyRow = ({ icon, text }: BodyRowProps) => {
  return (
    <Grid container item spacing={4}>
      <Grid item xs={2}>
        {icon}
      </Grid>
      <Grid item xs>
        <Typography variant="body1">{text}</Typography>
      </Grid>
    </Grid>
  );
};

export const Body = ({ validTo, isClaimed }: BodyProps) => {
  const classes = useStyles();

  const isClaimedText = isClaimed ? 'Claimed' : 'Unclaimed';
  const isClaimedIcon = isClaimed ? (
    <ClaimedIcon className={classes.success} />
  ) : (
    <UnclaimedIcon className={classes.info} />
  );

  const isValid = validTo >= getUnixTimeSec();
  const validToLocale = getLocaleFromUnix(validTo);
  const isValidText = isValid
    ? `Valid until ${validToLocale}`
    : `Expired on ${validToLocale}`;
  const isValidIcon = isValid ? (
    <CheckIcon className={classes.success} />
  ) : (
    <WarningIcon color="error" />
  );

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <Typography align="center" color="textSecondary">
          <i>Description</i>
        </Typography>
      </Grid>

      <Grid item>
        <BodyRow text={isClaimedText} icon={isClaimedIcon} />
      </Grid>

      <Grid item>
        <BodyRow text={isValidText} icon={isValidIcon} />
      </Grid>
    </Grid>
  );
};
