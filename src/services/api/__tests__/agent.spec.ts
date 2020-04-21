import * as AgentApi from 'services/api/agent';
import axios from 'axios';
import { mocked } from 'ts-jest/utils';

jest.mock('axios');
const mockedAxios = mocked(axios, true);

describe('AgentApi', () => {
    const agent_1 = {
        public_key: 'public_key_1',
        name: 'name_1',
        created_on: 1,
    };
    const agent_2 = {
        public_key: 'public_key_2',
        name: 'name_2',
        created_on: 2,
        organization: {
            id: 'org',
            name: 'org_name',
            organization_type: 2 as consensource.Organization.Type.STANDARDS_BODY,
        },
    };

    describe('loadAgents()', () => {
        describe('when called', () => {
            it('will return all agents in an array', async () => {
                mockedAxios.get.mockResolvedValueOnce({
                    data: [agent_1, agent_2],
                });
                await expect(AgentApi.loadAgents()).resolves.toEqual({
                    data: [agent_1, agent_2],
                });
            });
        });
    });

    describe('fetchAgent()', () => {
        describe('when given a valid public key', () => {
            it('will return the agent associated with the key', async () => {
                mockedAxios.get.mockResolvedValueOnce({ data: agent_1 });
                await expect(
                    AgentApi.fetchAgent('public_key_1'),
                ).resolves.toEqual({ data: agent_1 });
            });
        });
    });
});
