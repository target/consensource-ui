import React, { useState, useEffect } from 'react';
import { FactoryResData, fetchFactoryByOrgId } from 'services/api/factory';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { FactoryProfileContacts } from 'view/pages/FactoryProfile/Contacts';
import { FactoryProfileAddress } from 'view/pages/FactoryProfile/Address';
import { FactoryProfileCertifications } from 'view/pages/FactoryProfile/Certifications';
import { UnverifiedFactoryAlert } from 'view/pages/FactoryProfile/UnverifiedFactoryAlert';
import { ClaimedIconButton } from 'view/components/ClaimedIconButton';

const useStyles = makeStyles(
  createStyles({
    title: {
      textAlign: 'center',
    },
    claimedIconBtn: {
      marginTop: 12.5,
      marginLeft: 7.5,
    },
  }),
);

export function FactoryProfile() {
  const classes = useStyles();
  const { factoryId } = useParams();

  const [errMsg, setErrMsg] = useState('');
  const [factory, setFactory] = useState<FactoryResData | null>(null);

  const fetchFactory = async () => {
    try {
      const { data } = await fetchFactoryByOrgId(factoryId, { expand: true });
      setFactory(data);
    } catch ({ message }) {
      setErrMsg('Failed to fetch factory');
    }
  };

  useEffect(() => {
    fetchFactory();
  }, []);

  const isFactoryUnverified = factory && !!factory.assertion_id;

  if (!factory) {
    return <div>Loading!</div>;
  }

  return (
    <Grid container spacing={6}>
      <Grid container item justify="center" xs={12}>
        <Typography variant="h2" className={classes.title}>
          {factory.name}
        </Typography>

        {!isFactoryUnverified && (
          <div className={classes.claimedIconBtn}>
            <ClaimedIconButton size="large" />
          </div>
        )}
      </Grid>

      {isFactoryUnverified && (
        <Grid container justify="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <UnverifiedFactoryAlert factory={factory} />
          </Grid>
        </Grid>
      )}

      <Grid item xs={12}>
        <FactoryProfileCertifications certifications={factory.certificates} />
      </Grid>

      <Grid item xs={12}>
        <FactoryProfileContacts contacts={factory.contacts} />
      </Grid>

      <Grid item xs={12}>
        <FactoryProfileAddress address={factory.address} />
      </Grid>
    </Grid>
  );
}
