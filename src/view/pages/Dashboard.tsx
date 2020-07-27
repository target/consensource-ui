import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import CreateOrgForm from 'view/forms/organization';
import {
  Organization,
  CreateOrganizationAction,
  CreateAgentAction,
} from 'services/protobuf/compiled';
import { createOrgTransaction } from 'services/protobuf/organization';
import stores from 'stores';
import { createBatch } from 'services/protobuf/batch';
import BatchService from 'services/batch';
import { useHistory } from 'react-router-dom';
import CreateAgentActionForm from 'view/forms/CreateAgent';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { createAgentTransaction } from 'services/protobuf/agent';
import { DEFAULT_FORM_PAPER_ELEVATION } from 'view/forms';
import { SelectOrgType } from 'view/forms/organization/SelectOrgType';

function AgentSignUp() {
  const [errMsg, setErrMsg] = useState('');
  const history = useHistory();

  /**
   * Redirect a user to the dashboard screen if successful
   */
  const onSubmit = async (agentAction: CreateAgentAction) => {
    if (!stores.userStore.user) {
      setErrMsg('A signer is required to create an agent');
      return;
    }

    const { signer } = stores.userStore.user;

    const txns = new Array(createAgentTransaction(agentAction, signer));
    const batchListBytes = createBatch(txns, signer);

    try {
      await BatchService.submitBatch(batchListBytes);
      history.push('/dashboard');
    } catch ({ message }) {
      setErrMsg(message);
    }
  };

  return (
    <Paper elevation={DEFAULT_FORM_PAPER_ELEVATION}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5">Agent Signup</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">{errMsg}</Typography>
        </Grid>
        <Grid item>
          <CreateAgentActionForm onSubmit={onSubmit} />
        </Grid>
      </Grid>
    </Paper>
  );
}

function OrgSignup() {
  const [orgType, setOrgType] = useState(Organization.Type.UNSET_TYPE);

  const onSubmit = async (org: CreateOrganizationAction) => {
    let signer;

    if (!stores.userStore.user) {
      throw new Error('A signer is required to create an agent');
    } else {
      signer = stores.userStore.user.signer;
    }

    const txns = new Array(createOrgTransaction(org, signer));
    const batchListBytes = createBatch(txns, signer);
    await BatchService.submitBatch(batchListBytes);
  };

  return (
    <Paper elevation={DEFAULT_FORM_PAPER_ELEVATION}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h5">Org Types</Typography>
        </Grid>
        <Grid item>
          {orgType === Organization.Type.UNSET_TYPE ? (
            <SelectOrgType onOrgSelect={(org) => setOrgType(org)} />
          ) : (
            <CreateOrgForm organization_type={orgType} onSubmit={onSubmit} />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

export function Dashboard() {
  return (
    <div>
      <AgentSignUp />
      <OrgSignup />
    </div>
  );
}
