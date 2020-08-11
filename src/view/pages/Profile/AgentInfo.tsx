import React from 'react';
import { InfoItem } from 'view/components/InfoItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Organization</Typography>
      </Grid>

      {!org && (
        <Grid item xs>
          <CreateOrganizationForm />
        </Grid>
      )}

      {org && (
        <>
          <InfoItem title="Name" val={org.name} />
          <InfoItem
            title="Organization Type"
            val={org.organization_type.toString()}
          />
          <InfoItem title="Id" val={org.id} />
        </>
      )}
    </Grid>
  );
};

export const AgentInfo = ({ agent }: AgentInfoProps) => {
  const { batchStatus, setBatchStatusUrl } = useBatchStatus();

  return (
    <Grid container spacing={2}>
      {!agent && (
        <Grid item xs>
          <CreateAgentForm setBatchStatusUrl={setBatchStatusUrl} />
        </Grid>
      )}

      <div>Is resolved: {batchStatus ? 'resolved' : 'unresolved'}</div>

      {agent && (
        <>
          <InfoItem title="Name" val={agent.name} />
          <InfoItem
            title="Created On"
            val={new Date(agent.created_on).toLocaleDateString()}
          />
          <InfoItem title="Public Key" val={agent.public_key} />

          <Grid item xs={12}>
            <AgentOrgInfo org={agent.organization} />
          </Grid>
        </>
      )}
    </Grid>
  );
};
