import React from 'react';
import {
  Typography,
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

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="advanced-content"
        id="advanced-header"
      >
        <Typography variant="h5">Advanced</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <LoadingWithMinDisplay
          queryRes={queryRes}
          errorIndicator={<AgentInfo agent={null} />}
        >
          {({ data }) => <AgentInfo agent={data} />}
        </LoadingWithMinDisplay>
      </AccordionDetails>
    </Accordion>
  );
};
