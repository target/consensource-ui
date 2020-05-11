import axios from 'axios';

export const fetchAllAgents = (): Promise<any> => axios.get('/api/agents');

export const fetchAgent = (public_key: string): Promise<any> =>
	axios.get(`/api/agents/${public_key}`);
