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
import { isDataClaimed } from 'utils';
import { ButtonLink } from 'view/components';
import { Header } from './Header';
import { Body } from './Body';

export interface CertificationCardProps {
  certification: CertResData;
}

const useStyles = makeStyles(
  createStyles({
    cardContent: { paddingBottom: 0 },
    moreInfoBtn: {
      marginLeft: 'auto',
    },
  }),
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
              isClaimed={isDataClaimed(certification)}
            />
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <ButtonLink
          color="secondary"
          to={`/certifications/${certification.id}`}
          className={classes.moreInfoBtn}
        >
          More Info
        </ButtonLink>
      </CardActions>
    </Card>
  );
};
