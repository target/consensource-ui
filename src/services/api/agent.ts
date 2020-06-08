import axios from 'axios';
import { ApiRes } from 'services/api/utils';
import { Organization } from 'services/protobuf/compiled';

export interface AgentResData {
  public_key: string;
  name: string;
  created_on: number;
  organization: {
    id: string;
    name: string;
    organization_type: Organization.Type;
  };
}

export interface AgentReqParams {
  limit?: number;
  offset?: number;
  head?: number;
}

export async function fetchAgents(
  params?: AgentReqParams,
): Promise<ApiRes<AgentResData>> {
  const path = '/api/agents';

  const res = await axios.get(path, { params }).catch(({ message }: Error) => {
    throw new Error(`Failed to GET ${path}: ${message}`);
  });

  return res.data;
}

export async function fetchAgentByPubKey(
  publicKey: string,
  params?: AgentReqParams,
): Promise<ApiRes<AgentResData>> {
  const path = `/api/agents/${publicKey}`;

  const res = await axios.get(path, { params }).catch(({ message }: Error) => {
    throw new Error(`Failed to GET ${path}: ${message}`);
  });

  return res.data;
}
