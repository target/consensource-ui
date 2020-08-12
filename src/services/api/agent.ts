import axios, { AxiosResponse } from 'axios';
import { Organization } from 'services/protobuf/compiled';
import { PaginatedApiRes, BaseApiRes } from './utils';

export interface AgentResData {
  public_key: string;
  name: string;
  created_on: number;
  organization?: {
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

export async function fetchAgents(params?: AgentReqParams) {
  const path = '/api/agents';

  const res = await axios
    .get<PaginatedApiRes<AgentResData[]>>(path, { params })
    .catch(({ message }: Error) => {
      throw new Error(`Failed to GET ${path}: ${message}`);
    });

  return res.data;
}

export async function fetchAgentByPubKey(
  agentPubKey: string,
  params?: AgentReqParams,
) {
  const path = `/api/agents/${agentPubKey}`;

  const res = await axios
    .get<BaseApiRes<AgentResData>>(path, { params })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        return { data: { data: null } } as AxiosResponse<BaseApiRes<null>>;
      }

      throw new Error(`Failed to GET ${path}: ${error.message}`);
    });

  return res.data;
}
