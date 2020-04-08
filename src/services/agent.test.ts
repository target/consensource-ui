import * as m from 'mithril';
import * as crypto from 'crypto';
import * as addressing from 'App/addressing';
import { createContext, Signer } from 'sawtooth-sdk/signing';
import { CertificateRegistryPayload, CreateAgentAction } from 'App/protobuf';
import * as transactionService from 'App/services/transaction';
import * as agentService from 'App/services/agent';
import { mocked } from 'ts-jest/utils';

jest.mock('mithril');
const mockedMithril = mocked(m, true);
jest.mock('App/services/transaction');
const mockedTransactionService = mocked(transactionService, true);

const cryptoContext = createContext('secp256k1');
const privateKey = cryptoContext.newRandomPrivateKey();
const signer = new Signer(cryptoContext, privateKey);

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

describe('agentService', () => {
    describe('loadAgents()', () => {
        describe('when called', () => {
            it('will return all agents in an array', async () => {
                mockedMithril.request.mockResolvedValueOnce({ data: [agent_1, agent_2] });
                await expect(agentService.loadAgents()).resolves.toEqual({ data: [agent_1, agent_2] });
            });
        });
    });
    describe('fetchAgent()', () => {
        describe('when given a valid public key', () => {
            it('will return the agent associated with the key', async () => {
                mockedMithril.request.mockResolvedValueOnce({ data: agent_1 });
                await expect(agentService.fetchAgent('public_key_1')).resolves.toEqual({ data: agent_1 });
            });
        });
    });
    describe('createAgentTransaction()', () => {
        Date.now = jest.fn(() => 1000);

        const createAgent = CreateAgentAction.create({
            name: name,
            timestamp: Math.round(Date.now() / 1000),
        });
        const payloadBytes = CertificateRegistryPayload.encode({
            action: CertificateRegistryPayload.Action.CREATE_AGENT,
            createAgent,
        }).finish();

        const agentAddress = addressing.makeAgentAddress(signer.getPublicKey().asHex());
        const transaction = transactionService.createTransaction(
            {
                payloadBytes,
                inputs: [agentAddress],
                outputs: [agentAddress],
            },
            signer,
        );

        describe('when given a null signer', () => {
            it('will throw an error', () => {
                expect(() => agentService.createAgentTransaction('name', null)).toThrowError(
                    'A signer must be provided',
                );
            });
        });
        describe('when given a valid name and signer', () => {
            it('will return a CreateAgent transaction', () => {
                expect(agentService.createAgentTransaction('name', signer)).toEqual(transaction);
            });
        });
    });
    describe('createAgent()', () => {
        describe('when given a valid name and signer', () => {
            it('will submit a batch and return an array of txn ids', async () => {
                mockedTransactionService.submitBatch.mockResolvedValueOnce(['txn_id']);
                await expect(agentService.createAgent('name', signer)).resolves.toEqual(['txn_id']);
            });
        });
    });
});
