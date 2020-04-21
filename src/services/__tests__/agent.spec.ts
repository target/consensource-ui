import * as addressing from 'services/addressing';
import { createContext, Signer } from 'sawtooth-sdk/signing';
import { CertificateRegistryPayload, CreateAgentAction } from 'protobuf';
import TransactionService from 'services/transaction';
import AgentService from 'services/agent';
import { mocked } from 'ts-jest/utils';

jest.mock('services/transaction');
const mockedTransactionService = mocked(TransactionService, true);

const cryptoContext = createContext('secp256k1');
const privateKey = cryptoContext.newRandomPrivateKey();
const signer = new Signer(cryptoContext, privateKey);

describe('agentService', () => {
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

        const agentAddress = addressing.makeAgentAddress(
            signer.getPublicKey().asHex(),
        );
        const transaction = TransactionService.createTransaction(
            {
                payloadBytes,
                inputs: [agentAddress],
                outputs: [agentAddress],
            },
            signer,
        );

        describe('when given a null signer', () => {
            it('will throw an error', () => {
                expect(() =>
                    AgentService.createAgentTransaction('name', null),
                ).toThrowError('A signer must be provided');
            });
        });
        describe('when given a valid name and signer', () => {
            it('will return a CreateAgent transaction', () => {
                expect(
                    AgentService.createAgentTransaction('name', signer),
                ).toEqual(transaction);
            });
        });
    });
    describe('createAgent()', () => {
        describe('when given a valid name and signer', () => {
            it('will submit a batch and return an array of txn ids', async () => {
                mockedTransactionService.submitBatch.mockResolvedValueOnce([
                    'txn_id',
                ]);
                await expect(
                    AgentService.createAgent('name', signer),
                ).resolves.toEqual(['txn_id']);
            });
        });
    });
});
