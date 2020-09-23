import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider,
  Grid,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { AssignmentTurnedInOutlined as CheckIcon } from '@material-ui/icons';
import { CertResData } from 'services/api';

export interface CertificationCardProps {
  certification: CertResData;
}

const useStyles = makeStyles(({ palette }) =>
  createStyles({
    check: {
      color: palette.success.main,
    },
    centeredText: {
      textAlign: 'center',
    },
    info: {
      marginLeft: 'auto',
      textTransform: 'uppercase',
    },
  }),
);

export function CertificationCard({ certification }: CertificationCardProps) {
  const { standard_name, valid_to } = certification;
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
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography className={classes.centeredText} variant="h6">
              {standard_name}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle" />
          </Grid>

          <Grid item xs={12}>
            <Typography className={classes.centeredText} color="textSecondary">
              TODO: Descriptions
            </Typography>
          </Grid>

          <Grid container item spacing={4}>
            <Grid item xs={1}>
              <CheckIcon className={classes.check} />
            </Grid>
            <Grid item xs>
              <Typography variant="body1">
                Valid until {new Date(valid_to).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Button className={classes.info} disabled>
          More Info
        </Button>
      </CardActions>
    </Card>
  );
}
