import * as AgentApi from 'services/api/agent';
import axios from 'axios';
import { mocked } from 'ts-jest/utils';

jest.mock('axios');
const mockedAxios = mocked(axios, true);

describe('fetchAgentByPubKey()', () => {
  it('catches 404 errors and returns a null data object', async () => {
    mockedAxios.get.mockRejectedValue({ response: { status: 404 } });
    await expect(AgentApi.fetchAgentByPubKey('bad_key')).resolves.toEqual({
      data: null,
    });
  });

  it('catches non-404 errors and throws an error', async () => {
    const path = '/api/agents/bad_key';
    const errMsg = 'error';

    mockedAxios.get.mockRejectedValue({ message: errMsg });

    await expect(AgentApi.fetchAgentByPubKey('bad_key')).rejects.toEqual(
      Error(`Failed to GET ${path}: ${errMsg}`),
    );

    expect(mockedAxios.get).toHaveBeenCalledWith(path, {
      params: undefined,
    });
  });
});
