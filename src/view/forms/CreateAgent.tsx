import React, { useState } from 'react';
import { FormProps, hasEmptyFields } from 'view/forms';
import {
  createAgentAction,
  ICreateAgentActionStrict,
} from 'services/protobuf/agent';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Key from '@material-ui/icons/VpnKey';

/**
 * Form used to build a `CreateAgentAction` payload object
 */
export default function CreateAgentActionForm({
  onSubmit,
  onSubmitBtnLabel = 'Create Agent',
}: FormProps) {
  const [agent, setAgent] = useState<ICreateAgentActionStrict>({ name: '' });

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(createAgentAction(agent));
  };

  return (
    <form>
      <Grid container spacing={2}>
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
            {onSubmitBtnLabel}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
