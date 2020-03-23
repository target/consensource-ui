'use strict';

import * as m from 'mithril';
import * as crypto from 'crypto';
import * as addressing from 'App/addressing';
import * as transactionService from 'App/services/transaction';
import { CertificateRegistryPayload, CreateStandardAction, UpdateStandardAction } from 'App/protobuf';

const createStandard = (
    standardPayloadData: consensource.CreateStandardAction,
    orgId: string,
    signer: sawtooth.signing.Signer,
): Promise<any> => {
    if (!signer) {
        return Promise.reject('A signer must be provided');
    }

    if (!orgId) {
        return Promise.reject('An organization must be provided. Please, join or create one.');
    }

    const sha = crypto.createHash('sha256');

    const standardId = sha.update(standardPayloadData.name).digest('hex');

    const createStandardAction = CreateStandardAction.create({
        standardId: standardId,
        name: standardPayloadData.name,
        version: standardPayloadData.version,
        description: standardPayloadData.description,
        link: standardPayloadData.link,
        approvalDate: standardPayloadData.approvalDate,
    });

    const payloadBytes = CertificateRegistryPayload.encode({
        action: CertificateRegistryPayload.Action.CREATE_STANDARD,
        createStandard: createStandardAction,
    }).finish();

    const standardAddress = addressing.makeStandardAddress(createStandardAction.standardId);
    const agentAddress = addressing.makeAgentAddress(signer.getPublicKey().asHex());
    const organizationAddress = addressing.makeOrganizationAddress(orgId);

    return transactionService.submitTransaction(
        {
            payloadBytes,
            inputs: [standardAddress, agentAddress, organizationAddress],
            outputs: [standardAddress],
        },
        signer,
    );
};

const updateStandard = (standardPayloadData: any, orgId: string, signer: sawtooth.signing.Signer): Promise<any> => {
    if (!signer) {
        return Promise.reject('A signer must be provided');
    }

    if (!orgId) {
        return Promise.reject('An organization must be provided. Please, join or create one.');
    }

    const updateStandardAction = UpdateStandardAction.create({
        standardId: standardPayloadData.id,
        version: standardPayloadData.version,
        description: standardPayloadData.description,
        link: standardPayloadData.link,
        approvalDate: standardPayloadData.approvalDate,
    });

    const payloadBytes = CertificateRegistryPayload.encode({
        action: CertificateRegistryPayload.Action.UPDATE_STANDARD,
        updateStandard: updateStandardAction,
    }).finish();

    const standardAddress = addressing.makeStandardAddress(updateStandardAction.standardId);
    const agentAddress = addressing.makeAgentAddress(signer.getPublicKey().asHex());
    const organizationAddress = addressing.makeOrganizationAddress(orgId);

    return transactionService.submitTransaction(
        {
            payloadBytes,
            inputs: [standardAddress, agentAddress, organizationAddress],
            outputs: [standardAddress],
        },
        signer,
    );
};

const fetchStandard = (organization_id: string, standard_id: string): Promise<any> =>
    m
        .request({
            method: 'GET',
            url: `/api/standards_body/standards?organization_id=${organization_id}`,
        })
        .then((standards: any) => standards.data.filter((standard: any) => standard.standard_id === standard_id)[0]);

const loadStandards = (organization_id: string): Promise<any> =>
    m.request({
        method: 'GET',
        url: `/api/standards_body/standards?organization_id=${organization_id}`,
    });

const listStandards = (): Promise<any> =>
    m.request({
        method: 'GET',
        url: `/api/standards`,
    });

module.exports = {
    createStandard,
    updateStandard,
    listStandards,
    loadStandards,
    fetchStandard,
};
