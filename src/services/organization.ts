import * as m from 'mithril';
import * as addressing from 'App/addressing';
import * as transactionService from 'App/services/transaction';
import * as isoLangCodes from 'App/views/common/ISO-639-1-language.json';
import { v1 as uuidv1 } from 'uuid';
import { CertificateRegistryPayload, CreateOrganizationAction } from 'App/protobuf';
import { pluck } from 'App/utils';

/**
 * V1 UUID for an organization
 */
interface OrganizationId {
    organizationId: typeof uuidv1;
}

const loadOrganizations = (opts = {}) => {
    const params = pluck(opts, 'organization_type');
    return m.request({
        method: 'GET',
        url: '/api/organizations',
        data: params,
    });
};

const fetchOrganization = organizationId =>
    m.request({
        method: 'GET',
        url: `/api/organizations/${organizationId}`,
    });

const createOrganization = (name, type, contact, signer) => {
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

const languageLabel = currentCode => {
    const langInfo = isoLangCodes.find(({ code }) => code === currentCode);
    if (langInfo) {
        return langInfo.name;
    } else {
        return 'Unknown';
    }
};

export { createOrganization, loadOrganizations, fetchOrganization, languageLabel, OrganizationId };
