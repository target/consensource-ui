import React from 'react';
import { useAuth } from 'services/hooks';
import {
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { observer } from 'mobx-react-lite';
import { useAsync } from 'react-async-hook';
import { fetchAgentByPubKey } from 'services/api';
import { LoadingWithMinDisplay, LoadingSpinner } from 'view/components';
import { AgentInfo } from './AgentInfo';
import { UserInfo } from './UserInfo';

export const Profile = observer(() => {
  const user = useAuth();
  const { result, loading, error } = useAsync(fetchAgentByPubKey, [
    user.publicKeyString,
  ]);

  return (
    <Grid container spacing={6}>
      <Grid container item justify="center" xs={12}>
        <Typography variant="h3">Profile</Typography>
      </Grid>

      <Grid item xs={12}>
        <UserInfo user={user} />
      </Grid>

      <Grid item xs={6}>
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
                  {result?.data ? 'Agent Info' : 'Create an Agent'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <LoadingWithMinDisplay
                  isLoading={loading}
                  loadingIndicator={<LoadingSpinner size={60} />}
                >
                  {error && (
                    <Grid item xs={12}>
                      <Typography color="error">
                        Failed to load agent info
                      </Typography>
                    </Grid>
                  )}

                  {result && <AgentInfo agent={result.data} />}
                </LoadingWithMinDisplay>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
});
