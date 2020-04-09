import * as m from 'mithril';
import * as addressing from 'App/addressing';
import * as transactionService from 'App/services/transaction';
import * as isoLangCodes from 'App/views/common/ISO-639-1-language.json';
import { v1 as uuidv1 } from 'uuid';
import { CertificateRegistryPayload, CreateOrganizationAction } from 'App/protobuf';
import { pluck } from 'App/utils';

export const loadOrganizations = (opts = {}): Promise<any> => {
    const params = pluck(opts, 'organization_type');
    return m.request({
        method: 'GET',
        url: '/api/organizations',
        params: params,
    });
};

export const fetchOrganization = (organizationId: string): Promise<any> =>
    m.request({
        method: 'GET',
        url: `/api/organizations/${organizationId}`,
    });

export const createOrganization = (
    name: string,
    type: consensource.Organization.Type,
    contact: any,
    signer: sawtooth.signing.Signer,
): Promise<any> => {
    if (!name) {
        throw new Error('An organization name must be provided.');
    } else if (!type) {
        throw new Error('An organization type must be provided.');
    }
    const organization_id = uuidv1();
    const createOrganization = CreateOrganizationAction.create({
        id: organization_id,
        name: name,
        organizationType: type,
        contacts: [contact],
    });
    const payloadBytes = CertificateRegistryPayload.encode({
        action: CertificateRegistryPayload.Action.CREATE_ORGANIZATION,
        createOrganization,
    }).finish();

    const organizationAddress = addressing.makeOrganizationAddress(organization_id);
    const agentAddress = addressing.makeAgentAddress(signer.getPublicKey().asHex());

    return transactionService.submitTransaction(
        {
            payloadBytes,
            inputs: [organizationAddress, agentAddress],
            outputs: [organizationAddress, agentAddress],
        },
        signer,
    );
};

export const languageLabel = (currentCode: string): string => {
    const langInfo = isoLangCodes.find(({ code }) => code === currentCode);
    if (langInfo) {
        return langInfo.name;
    } else {
        return 'Unknown';
    }
};
