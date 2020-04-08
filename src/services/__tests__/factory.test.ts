import * as m from 'mithril';
import * as crypto from 'crypto';
import * as addressing from 'App/addressing';
import { createContext, Signer } from 'sawtooth-sdk/signing';
import { CertificateRegistryPayload, CreateOrganizationAction, Factory, Organization } from 'App/protobuf';
import * as transactionService from 'App/services/transaction';
import * as factoryService from 'App/services/factory';
import { mocked } from 'ts-jest/utils';

jest.mock('mithril');
const mockedMithril = mocked(m, true);
jest.mock('App/services/transaction');
const mockedTransactionService = mocked(transactionService, true);

const factory = {
    id: 'id',
    name: 'test',
    orgName: 'test',
    contacts: [{ name: 'contact', language_code: 'lang', phone_number: '7' }],
    authorizations: [{ public_key: 'public_key', role: 2 as consensource.Organization.Authorization.Role.TRANSACTOR }],
    address: {
        street_line_1: 'street_1',
        street_line_2: 'street_2',
        city: 'city',
        state_province: 'state',
        country: 'country',
        postal_code: '11111',
    },
    certificates: null,
    organization_type: 3 as consensource.Organization.Type.FACTORY,
};

const expanded_factory = {
    id: 'id',
    name: 'test',
    orgName: 'test',
    contacts: [{ name: 'contact', language_code: 'lang', phone_number: '7' }],
    authorizations: [{ public_key: 'public_key', role: 2 as consensource.Organization.Authorization.Role.TRANSACTOR }],
    address: {
        street_line_1: 'street_1',
        street_line_2: 'street_2',
        city: 'city',
        state_province: 'state',
        country: 'country',
        postal_code: '11111',
    },
    certificates: [
        {
            id: 'cert',
            certifying_body_id: 'cert_body_id',
            certifying_body: 'cert_body',
            factory_id: 'id',
            factory_name: 'test',
            standard_id: 'standard_id',
            standard_name: 'standard_name',
            standard_version: 'v1',
            valid_from: 1,
            valid_to: 2,
        },
    ],
    organization_type: 3 as consensource.Organization.Type.FACTORY,
};

const cryptoContext = createContext('secp256k1');
const privateKey = cryptoContext.newRandomPrivateKey();
const signer = new Signer(cryptoContext, privateKey);

describe('factoryService', () => {
    describe('loadFactories()', () => {
        describe('given no options', () => {
            it('will return all factories in an array', async () => {
                mockedMithril.request.mockResolvedValueOnce({ data: [factory] });
                await expect(factoryService.loadFactories()).resolves.toEqual({
                    data: [factory],
                });
            });
        });
        describe('given a name option', () => {
            it('will return the factory of that name in an array', async () => {
                mockedMithril.request.mockResolvedValueOnce({ data: [factory] });
                await expect(factoryService.loadFactories({ name: 'test' })).resolves.toEqual({
                    data: [factory],
                });
            });
        });
    });
    describe('fetchFactory()', () => {
        describe('given an organization id', () => {
            it('will return the factory', async () => {
                mockedMithril.request.mockResolvedValueOnce({ data: factory });
                await expect(factoryService.fetchFactory('id')).resolves.toEqual({
                    data: factory,
                });
            });
        });
        describe('given an org id and an expand option', () => {
            it('will return the expanded factory', async () => {
                mockedMithril.request.mockResolvedValueOnce({ data: expanded_factory });
                await expect(factoryService.fetchFactory('id')).resolves.toEqual({
                    data: expanded_factory,
                });
            });
        });
    });
    describe('createFactoryTransaction()', () => {
        const factory_id = crypto
            .createHash('sha256')
            .update(factory.orgName)
            .digest('hex')
            .substring(0, 60);
        const createAction = CreateOrganizationAction.create({
            id: factory_id,
            organizationType: Organization.Type.FACTORY,
            name: factory.orgName,
            contacts: [
                Organization.Contact.create({
                    name: factory.contacts[0].name,
                    phoneNumber: factory.contacts[0].phone_number,
                    languageCode: factory.contacts[0].language_code,
                }),
            ],
            address: Factory.Address.create({
                streetLine_1: factory.address.street_line_1,
                streetLine_2: factory.address.street_line_2,
                city: factory.address.city,
                stateProvince: factory.address.state_province,
                country: factory.address.country,
                postalCode: factory.address.postal_code,
            }),
        });
        const payloadBytes = CertificateRegistryPayload.encode({
            action: CertificateRegistryPayload.Action.CREATE_ORGANIZATION,
            createOrganization: createAction,
        }).finish();

        const factoryAddress = addressing.makeOrganizationAddress(factory_id);
        const agentAddress = addressing.makeAgentAddress(signer.getPublicKey().asHex());

        const transaction = transactionService.createTransaction(
            {
                payloadBytes,
                inputs: [factoryAddress, agentAddress],
                outputs: [factoryAddress, agentAddress],
            },
            signer,
        );

        describe('given a null signer', () => {
            it('will return undefined', () => {
                console.error = jest.fn();
                expect(factoryService.createFactoryTransaction(factory, null)).toBe(undefined);
                expect(console.error).toBeCalledWith('A signer must be provided');
            });
        });
        describe('given a factory and a signer', () => {
            it('will return a transaction to create the factory', () => {
                expect(factoryService.createFactoryTransaction(factory, signer)).toEqual(transaction);
            });
        });
    });
    describe('createFactory()', () => {
        describe('given a factory and signer', () => {
            it('will create a transaction and submit it in a batch', async () => {
                mockedTransactionService.submitBatch.mockResolvedValueOnce(['txn_id']);
                await expect(factoryService.createFactory(factory, signer)).resolves.toEqual(['txn_id']);
            });
        });
    });
    describe('updateFactory()', () => {
        describe('given a null signer', () => {
            it('will reject the promise', async () => {
                await expect(factoryService.updateFactory(factory, null)).rejects.toBeTruthy();
            });
        });
        describe('given a valid factory and signer', () => {
            it('will return the txn id', async () => {
                mockedTransactionService.submitTransaction.mockResolvedValueOnce(['txn_id']);
                await expect(factoryService.updateFactory(factory, signer)).resolves.toEqual(['txn_id']);
            });
        });
    });
});
