import * as m from 'mithril';
import { createContext, Signer } from 'sawtooth-sdk/signing';
import * as transactionService from 'App/services/transaction';
import * as organizationService from 'App/services/organization';
import { mocked } from 'ts-jest/utils';

jest.mock('mithril');
const mockedMithril = mocked(m, true);
jest.mock('App/services/transaction');
const mockedTransactionService = mocked(transactionService, true);

const organization = {
    id: 'sb_id',
    name: 'sb_test',
    contacts: [{ name: 'contact', language_code: 'lang', phone_number: '7' }],
    authorizations: [
        { public_key: 'public_key_1', role: 2 as consensource.Organization.Authorization.Role.TRANSACTOR },
    ],
    certificates: null,
    organization_type: 2 as consensource.Organization.Type.STANDARDS_BODY,
};

const factory = {
    id: 'factory_id',
    name: 'factory_test',
    contacts: [{ name: 'contact', language_code: 'lang', phone_number: '7' }],
    authorizations: [
        { public_key: 'public_key_2', role: 2 as consensource.Organization.Authorization.Role.TRANSACTOR },
    ],
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

const contact = { name: 'contact', language_code: 'lang', phone_number: '7' };

const cryptoContext = createContext('secp256k1');
const privateKey = cryptoContext.newRandomPrivateKey();
const signer = new Signer(cryptoContext, privateKey);

describe('organizationService', () => {
    describe('loadOrganizations()', () => {
        describe('given no options', () => {
            it('will return an array of all organizations', async () => {
                mockedMithril.request.mockResolvedValueOnce({ data: [organization, factory] });
                await expect(organizationService.loadOrganizations()).resolves.toEqual({
                    data: [organization, factory],
                });
            });
        });
        describe('given a type option', () => {
            it('will return an array of all organizations of that type', async () => {
                mockedMithril.request.mockResolvedValueOnce({ data: [factory] });
                await expect(
                    organizationService.loadOrganizations({
                        organization_type: 3 as consensource.Organization.Type.FACTORY,
                    }),
                ).resolves.toEqual({
                    data: [factory],
                });
            });
        });
    });
    describe('fetchOrganization()', () => {
        describe('given an org id', () => {
            it('will return the org with that id', async () => {
                mockedMithril.request.mockResolvedValueOnce({ data: [organization] });
                await expect(organizationService.fetchOrganization('sb_id')).resolves.toEqual({
                    data: [organization],
                });
            });
        });
    });
    describe('createOrganization()', () => {
        describe('given a null name', () => {
            it('will throw a new Error', async () => {
                expect.assertions(1);
                try {
                    organizationService.createOrganization(
                        null,
                        2 as consensource.Organization.Type.STANDARDS_BODY,
                        contact,
                        signer,
                    );
                } catch (error) {
                    expect(error).toEqual(new Error('An organization name must be provided.'));
                }
            });
        });
        describe('given a null org type', () => {
            it('will throw a new Error', async () => {
                expect.assertions(1);
                try {
                    organizationService.createOrganization('sb_id', null, contact, signer);
                } catch (error) {
                    expect(error).toEqual(new Error('An organization type must be provided.'));
                }
            });
        });
        describe('given all parameters', () => {
            it('will respond with the txn ids', async () => {
                mockedTransactionService.submitTransaction.mockResolvedValueOnce(['txn_id']);
                await expect(
                    organizationService.createOrganization(
                        'sb_id',
                        2 as consensource.Organization.Type.STANDARDS_BODY,
                        contact,
                        signer,
                    ),
                ).resolves.toEqual(['txn_id']);
            });
        });
    });
    describe('languageLabel()', () => {
        describe('given a valid language code string', () => {
            it('will return the name of the language as a string', async () => {
                expect(organizationService.languageLabel('en')).toBe('English');
            });
        });
        describe('given an invalid language code string', () => {
            it('will return the string "Unknown"', async () => {
                expect(organizationService.languageLabel('klingon')).toBe('Unknown');
            });
        });
    });
});
