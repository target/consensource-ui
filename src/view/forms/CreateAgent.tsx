import React, { useState } from 'react';
import { FormProps, hasEmptyFields } from 'view/forms';
import {
  createAgentAction,
  ICreateAgentActionStrict,
} from 'services/protobuf/agent';

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
      <div>
        <label htmlFor="agent-name">
          name
          <input
            value={agent.name}
            onChange={(e) => setAgent({ name: e.target.value })}
            placeholder="Name"
            type="text"
            id="agent-name"
            required
          />
        </label>
      </div>
      <button type="submit" onClick={submit} disabled={hasEmptyFields(agent)}>
        {onSubmitBtnLabel}
      </button>
    </form>
  );
}
