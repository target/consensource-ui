import React, { useState } from 'react';
import {
  hasEmptyFields,
  FormErrMsg,
  TransactionFormProps,
} from 'view/forms/utils';
import {
  createAgentAction,
  ICreateAgentActionStrict,
  createAgentTransaction,
} from 'services/protobuf/agent';
import { Grid, TextField, InputAdornment, Button } from '@material-ui/core';
import { VpnKey as Key, AccountCircle } from '@material-ui/icons';
import { createBatch } from 'services/protobuf/batch';
import { useAuth } from 'services/hooks';
import { postBatches } from 'services/api';

export const CreateAgentForm = ({
  setBatchStatusLink,
}: TransactionFormProps) => {
  const { signer } = useAuth();
  const [errMsg, setErrMsg] = useState('');
  const [agent, setAgent] = useState<ICreateAgentActionStrict>({ name: '' });

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    const agentAction = createAgentAction(agent);

    const txns = new Array(createAgentTransaction(agentAction, signer));
    const batchListBytes = createBatch(txns, signer);

    try {
      const { link } = await postBatches(batchListBytes);
      setBatchStatusLink(link);
    } catch ({ message }) {
      setErrMsg(message);
    }
  };

  return (
    <form>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <FormErrMsg msg={errMsg} />
        </Grid>

        <Grid item>
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

        <Grid item>
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
};
