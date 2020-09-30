import React from 'react';
import {
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { useQuery } from 'react-query';
import { User } from 'stores';
import { fetchAgentByPubKey } from 'services/api';
import { LoadingWithMinDisplay } from 'view/components';
import { AgentInfo } from './AgentInfo';

export interface AgentAccordionProps {
  agentPubKey: User['publicKeyString'];
}

export const AgentAccordion = ({ agentPubKey }: AgentAccordionProps) => {
  const queryRes = useQuery('fetchAgentByPubKey', () =>
    fetchAgentByPubKey(agentPubKey),
  );

  const { data } = queryRes;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="advanced-content"
        id="advanced-header"
      >
        <Typography variant="h6">Advanced</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">
              {data?.data ? 'Agent Info' : 'Create an Agent'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <LoadingWithMinDisplay queryRes={queryRes}>
              {data && <AgentInfo agent={data.data} />}
            </LoadingWithMinDisplay>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
