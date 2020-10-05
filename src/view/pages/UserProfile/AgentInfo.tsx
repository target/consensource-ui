import React from 'react';
import { InfoItem } from 'view/components';
import { Typography, Grid } from '@material-ui/core';
import { AgentResData } from 'services/api';
import { CreateAgentForm, CreateOrganizationForm } from 'view/forms';
import { useBatchStatus } from 'services/hooks';

export interface AgentInfoProps {
  agent: AgentResData | null;
}

export interface AgentOrgInfoProps {
  org: AgentResData['organization'];
}

const AgentOrgInfo = ({ org }: AgentOrgInfoProps) => {
  const { batchStatus, setBatchStatusLink } = useBatchStatus();

  return org ? (
    <Grid container spacing={2}>
      <Grid item>
        <Typography variant="h5">Organization Info</Typography>
      </Grid>
      <Grid container item>
        <InfoItem title="Name" val={org.name} />
        <InfoItem
          title="Organization Type"
          val={org.organization_type.toString()}
        />
        <InfoItem title="Id" val={org.id} />
      </Grid>
    </Grid>
  ) : (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h5">Create An Organization</Typography>
      </Grid>
      <Grid item>
        <CreateOrganizationForm setBatchStatusLink={setBatchStatusLink} />
      </Grid>

      <Grid item>
        <InfoItem
          title="Batch Status"
          val={batchStatus ? batchStatus.toString() : ''}
        />
      </Grid>
    </Grid>
  );
};

export const AgentInfo = ({ agent }: AgentInfoProps) => {
  const { batchStatus, setBatchStatusLink } = useBatchStatus();

  return agent ? (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h5">Agent Info</Typography>
      </Grid>
      <Grid container item>
        <InfoItem title="Name" val={agent.name} />
        <InfoItem
          title="Created On"
          val={new Date(agent.created_on).toLocaleDateString()}
        />
        <InfoItem title="Public Key" val={agent.public_key} />
      </Grid>

      <Grid item>
        <AgentOrgInfo org={agent.organization} />
      </Grid>
    </Grid>
  ) : (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h5">Create An Agent</Typography>
      </Grid>

      <Grid item>
        <CreateAgentForm setBatchStatusLink={setBatchStatusLink} />
      </Grid>

      <Grid item>
        <InfoItem
          title="Batch Status"
          val={batchStatus ? batchStatus.toString() : ''}
        />
      </Grid>
    </Grid>
  );
};
