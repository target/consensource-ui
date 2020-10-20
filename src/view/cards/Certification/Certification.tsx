import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { CertResData } from 'services/api';
import { hasOwnPropertySafe } from 'utils';
import { MoreInfoLinkButton } from './MoreInfoLinkButton';
import { Header } from './Header';
import { Body } from './Body';

export interface CertificationCardProps {
  certification: CertResData;
}

const useStyles = makeStyles(
  createStyles({ cardContent: { paddingBottom: 0 } }),
);

export const CertificationCard = ({
  certification,
}: CertificationCardProps) => {
  const classes = useStyles();
  const [isRaised, setIsRaised] = useState(false);

  return (
    <Card
      onMouseOver={() => setIsRaised(true)}
      onMouseOut={() => setIsRaised(false)}
      onFocus={() => setIsRaised(true)}
      onBlur={() => setIsRaised(false)}
      raised={isRaised}
    >
      <CardContent className={classes.cardContent}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Header standardName={certification.standard_name} />
          </Grid>

          <Grid item>
            <Body
              validTo={certification.valid_to}
              isClaimed={!hasOwnPropertySafe(certification, 'assertion_id')}
            />
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <MoreInfoLinkButton certificationId={certification.id} />
      </CardActions>
    </Card>
  );
};
