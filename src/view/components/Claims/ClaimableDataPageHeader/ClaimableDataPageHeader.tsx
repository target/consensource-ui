import React, { FC } from 'react';
import { Typography, Grid, makeStyles, createStyles } from '@material-ui/core';
import { isDataClaimed } from 'utils';
import { SubtitleText } from './SubtitleText';
import { ClaimedIconButton } from '../ClaimedIconButton';
import { UnverifiedDataAlert } from '../UnverifiedDataAlert';

const useStyles = makeStyles(
  createStyles({
    claimedIconBtn: {
      marginTop: 12.5,
      marginLeft: 7.5,
    },
  }),
);

export interface ClaimableDataPageHeaderProps {
  title: string;
  subtitle?: string | React.ReactNode;
  /**
   * Used to determine if the data is claimed or unclaimed
   */
  data: Record<string, any>;
}

export const ClaimableDataPageHeader: FC<ClaimableDataPageHeaderProps> = ({
  title,
  subtitle,
  data,
}) => {
  const classes = useStyles();
  const isClaimed = isDataClaimed(data);

  return (
    <Grid container alignItems="center" direction="column" spacing={2}>
      <Grid item container justify="center" spacing={2}>
        <Grid item>
          <Typography variant="h2" align="center">
            {title}
          </Typography>
        </Grid>

        {isClaimed && (
          <Grid item>
            <div className={classes.claimedIconBtn}>
              <ClaimedIconButton fontSize="large" />
            </div>
          </Grid>
        )}
      </Grid>

      {subtitle && (
        <Grid item>
          {typeof subtitle === 'string' ? (
            <SubtitleText>{subtitle}</SubtitleText>
          ) : (
            subtitle
          )}
        </Grid>
      )}

      {!isClaimed && (
        <Grid item xs={6}>
          <UnverifiedDataAlert />
        </Grid>
      )}
    </Grid>
  );
};
