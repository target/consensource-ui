import React from 'react';
import { InfoItem } from 'view/components/InfoItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { AgentResData } from 'services/api/agent';
import { CreateAgentForm, CreateOrganizationForm } from 'view/forms';

export interface AgentInfoProps {
  agent: AgentResData | null;
}

interface AgentOrgInfoProps {
  org: AgentResData['organization'];
}

function AgentOrgInfo({ org }: AgentOrgInfoProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Organization</Typography>
      </Grid>

      {!org && (
        <Grid item xs={4}>
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
}

export function AgentInfo({ agent }: AgentInfoProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Agent Info</Typography>
      </Grid>

      {!agent && (
        <Grid item xs={4}>
          <CreateAgentForm />
        </Grid>
      )}

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
}
