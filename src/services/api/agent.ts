import { PaginatedApiRes } from 'services/api/utils';
import { Organization } from 'services/protobuf/compiled';
import useAxios from 'axios-hooks';

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

export function fetchAgents(params?: AgentReqParams) {
  return useAxios<PaginatedApiRes<AgentResData[]>>({
    method: 'GET',
    url: '/api/agents',
    params,
  });
}

export function fetchAgentByPubKey(publicKey: string, params?: AgentReqParams) {
  return useAxios<PaginatedApiRes<AgentResData>>({
    method: 'GET',
    url: `/api/agents/${publicKey}`,
    params,
  });
}
