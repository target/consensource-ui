import axios from 'axios';
import {
  ApiRes,
  createReqWithParam,
  BaseReqParams,
  Paging,
} from 'services/api';

export interface AgentRes extends ApiRes<AgentResData> {
  link: string;
  head: number;
  paging: Paging;
  data: AgentResData[];
}

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

export async function fetchAgents(params?: BaseReqParams): Promise<AgentRes> {
  const path = createReqWithParam('/api/agents', params);

  const res = await axios.get(path).catch(({ message }: Error) => {
    throw new Error(`Failed to GET ${path}: ${message}`);
  });

  return res.data;
}

export async function fetchAgentByPubKey(
  publicKey: string,
  params?: BaseReqParams,
): Promise<AgentRes> {
  const path = createReqWithParam(`/api/agents/${publicKey}`, params);

  const res = await axios.get(path).catch(({ message }: Error) => {
    throw new Error(`Failed to GET ${path}: ${message}`);
  });

  return res.data;
}
