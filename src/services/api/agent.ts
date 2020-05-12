import axios from 'axios';

export function fetchAllAgents(): Promise<any> {
  const url = '/api/agents';

  return axios.get(url).catch((e: Error) => {
    throw new Error(`Failed to GET ${url}: ${e.message}`);
  });
}

export function fetchAgent(public_key: string): Promise<any> {
  const url = `/api/agents/${public_key}`;

  return axios.get(url).catch((e: Error) => {
    throw new Error(`Failed to GET ${url}: ${e.message}`);
  });
}
