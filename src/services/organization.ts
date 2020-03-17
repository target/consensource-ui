import * as m from 'mithril';
import * as addressing from '../addressing';
import * as transactionService from './transaction';
import * as isoLangCodes from '../views/common/ISO-639-1-language.json';
import { v1 as uuidv1 } from 'uuid';
import { CertificateRegistryPayload, CreateOrganizationAction } from '../protobuf';
import { pluck } from '../utils';

/**
 * V1 UUID for an organization
 */
export interface OrganizationId {
    organizationId: typeof uuidv1;
}

const loadOrganizations = (opts = {}): Promise<any> => {
    const params = pluck(opts, 'organization_type');
    return m.request({
        method: 'GET',
        url: '/api/organizations',
        params: params,
    });
};

const fetchOrganization = (organizationId: string): Promise<any> =>
    m.request({
        method: 'GET',
        url: `/api/organizations/${organizationId}`,
    });

const createOrganization = (
    name: string,
    type: consensource.Organization.Type,
    contact: consensource.Organization.Contact,
    signer: sawtooth.signing.Signer,
) => {
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

const languageLabel = (currentCode: string) => {
    const langInfo = isoLangCodes.find(({ code }) => code === currentCode);
    if (langInfo) {
        return langInfo.name;
    } else {
        return 'Unknown';
    }
};

export { createOrganization, loadOrganizations, fetchOrganization, languageLabel };
