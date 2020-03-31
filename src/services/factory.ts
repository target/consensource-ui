import * as m from 'mithril';
import * as crypto from 'crypto';
import * as addressing from 'App/addressing';
import * as transactionService from 'App/services/transaction';
import {
    CertificateRegistryPayload,
    Organization,
    Factory,
    CreateOrganizationAction,
    UpdateOrganizationAction,
} from 'App/protobuf';
import { pluck } from 'App/utils';

function create_factory_id(name: string): string {
    const sha = crypto.createHash('sha256');
    return sha
        .update(name)
        .digest('hex')
        .substring(0, 60);
}

export const loadFactories = (opts = {}): Promise<any> => {
    const args = pluck(opts, 'name');
    return m.request({
        method: 'GET',
        url: '/api/factories',
        params: args,
    });
};

export const fetchFactory = (organization_id: string, opts = {}): Promise<any> => {
    const params = pluck(opts, 'expand');
    return m.request({
        method: 'GET',
        url: `/api/factories/${organization_id}`,
        params: params,
    });
};

export const createFactoryTransaction = (
    factory: any,
    signer: sawtooth.signing.Signer,
): sawtooth.protobuf.Transaction | null => {
    if (!signer) {
        console.error('A signer must be provided');
        return;
    }

    const factory_id = create_factory_id(factory.orgName);

    const createAction = CreateOrganizationAction.create({
        id: factory_id,
        organizationType: Organization.Type.FACTORY,
        name: factory.orgName,
        contacts: [
            Organization.Contact.create({
                name: factory.contactName,
                phoneNumber: factory.contactPhoneNumber,
                languageCode: factory.contactLanguageCode,
            }),
        ],
        address: Factory.Address.create({
            streetLine_1: factory.addressStreetLine1,
            streetLine_2: factory.addressStreetLine2,
            city: factory.addressCity,
            stateProvince: factory.addressStateProvince,
            country: factory.addressCountry,
            postalCode: factory.addressPostalCode,
        }),
    });

    const payloadBytes = CertificateRegistryPayload.encode({
        action: CertificateRegistryPayload.Action.CREATE_ORGANIZATION,
        createOrganization: createAction,
    }).finish();

    const factoryAddress = addressing.makeOrganizationAddress(factory_id);
    const agentAddress = addressing.makeAgentAddress(signer.getPublicKey().asHex());

    return transactionService.createTransaction(
        {
            payloadBytes,
            inputs: [factoryAddress, agentAddress],
            outputs: [factoryAddress, agentAddress],
        },
        signer,
    );
};

export const createFactory = (factory: any, signer: sawtooth.signing.Signer): Promise<any> =>
    transactionService.submitBatch([createFactoryTransaction(factory, signer)], signer);

export const updateFactory = (factory: any, signer: sawtooth.signing.Signer): Promise<any> => {
    if (!signer) {
        return Promise.reject('A signer must be provided');
    }

    const updateAction = UpdateOrganizationAction.create({
        address: Factory.Address.create({
            streetLine_1: factory.addressStreetLine1,
            streetLine_2: factory.addressStreetLine2,
            city: factory.addressCity,
            stateProvince: factory.addressStateProvince,
            country: factory.addressCountry,
            postalCode: factory.addressPostalCode,
        }),
        contacts: [
            Organization.Contact.create({
                name: factory.contactName,
                phoneNumber: factory.contactPhoneNumber,
                languageCode: factory.contactLanguageCode,
            }),
        ],
    });

    const payloadBytes = CertificateRegistryPayload.encode({
        action: CertificateRegistryPayload.Action.UPDATE_ORGANIZATION,
        updateOrganization: updateAction,
    }).finish();

    const factoryAddress = addressing.makeOrganizationAddress(create_factory_id(factory.name));
    const agentAddress = addressing.makeAgentAddress(signer.getPublicKey().asHex());

    return transactionService.submitTransaction(
        {
            payloadBytes,
            inputs: [factoryAddress, agentAddress],
            outputs: [factoryAddress, agentAddress],
        },
        signer,
    );
};
