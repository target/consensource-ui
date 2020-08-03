import React, { useState } from 'react';
import { hasEmptyFields, FormErrMsg } from 'view/forms/utils';
import {
  createAgentAction,
  ICreateAgentActionStrict,
  createAgentTransaction,
} from 'services/protobuf/agent';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Key from '@material-ui/icons/VpnKey';
import stores from 'stores';
import { createBatch } from 'services/protobuf/batch';
import BatchService from 'services/batch';

export function CreateAgentForm() {
  const [errMsg, setErrMsg] = useState('');
  const [agent, setAgent] = useState<ICreateAgentActionStrict>({ name: '' });

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stores.userStore.user) {
      setErrMsg('A signer is required to create an agent');
      return;
    }

    const { signer } = stores.userStore.user;
    const agentAction = createAgentAction(agent);

    const txns = new Array(createAgentTransaction(agentAction, signer));
    const batchListBytes = createBatch(txns, signer);

    try {
      await BatchService.submitBatch(batchListBytes);
    } catch ({ message }) {
      setErrMsg(message);
    }
  };

  return (
    <form>
      <Grid container spacing={2}>
        <FormErrMsg msg={errMsg} />
        <Grid item xs={12}>
          <TextField
            color="secondary"
            value={agent.name}
            onChange={(e) => setAgent({ name: e.target.value })}
            label="Name"
            id="agent-name"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={submit}
            disabled={hasEmptyFields(agent)}
            endIcon={<Key />}
          >
            Create Agent
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
