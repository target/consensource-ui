import axios from 'axios';
import { ApiRes, createReqWithParam } from 'services/api';

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
  const path = createReqWithParam('/api/agents', params);

  const res = await axios.get(path).catch(({ message }: Error) => {
    throw new Error(`Failed to GET ${path}: ${message}`);
  });

  return res.data;
}

export async function fetchAgentByPubKey(
  publicKey: string,
  params?: AgentReqParams,
): Promise<ApiRes<AgentResData>> {
  const path = createReqWithParam(`/api/agents/${publicKey}`, params);

  const res = await axios.get(path).catch(({ message }: Error) => {
    throw new Error(`Failed to GET ${path}: ${message}`);
  });

  return res.data;
}
