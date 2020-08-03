import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Check from '@material-ui/icons/AssignmentTurnedInOutlined';
import Icon from '@material-ui/core/Icon';
import { makeStyles, createStyles } from '@material-ui/core/styles';
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
  const classes = useStyles();

  const [isRaised, setIsRaised] = useState(false);

  const { standard_name, valid_to } = certification;

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
              <Icon>
                <Check className={classes.check} />
              </Icon>
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
        <Button className={classes.info}>More Info</Button>
      </CardActions>
    </Card>
  );
}
