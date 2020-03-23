'use strict';

import * as m from 'mithril';
import { v1 as uuidv1 } from 'uuid';
import * as addressing from 'App/addressing';
import * as transactionService from 'App/services/transaction';
import { CertificateRegistryPayload, ChangeRequestStatusAction, OpenRequestAction } from 'App/protobuf';
import { pluck } from 'App/utils';

const loadCertificateRequests = (opts = {}): Promise<any> => {
    const args = pluck(opts, 'factory_id', 'expand');
    return m.request({
        method: 'GET',
        url: '/api/requests',
        params: args,
    });
};

const openCertificateRequest = (certRequest: consensource.Request, signer: sawtooth.signing.Signer): Promise<any> => {
    if (!signer) {
        return Promise.reject('A signer must be provided');
    }

    const requestId = uuidv1();

    const requestAction = OpenRequestAction.create({
        id: requestId,
        standardId: certRequest.standardId,
        requestDate: certRequest.requestDate,
    });

    const payloadBytes = CertificateRegistryPayload.encode({
        action: CertificateRegistryPayload.Action.OPEN_REQUEST_ACTION,
        openRequestAction: requestAction,
    }).finish();

    const agentAddress = addressing.makeAgentAddress(signer.getPublicKey().asHex());
    const certRequestAddress = addressing.makeCertificateRequestAddress(requestId);
    const factoryAddress = addressing.makeOrganizationAddress(certRequest.factoryId);
    const standardAddress = addressing.makeStandardAddress(certRequest.standardId);

    const inputs = [agentAddress, certRequestAddress, factoryAddress, standardAddress];
    const outputs = [certRequestAddress];

    return transactionService.submitTransaction(
        {
            payloadBytes,
            inputs: inputs,
            outputs: outputs,
        },
        signer,
    );
};

const changeCertificateRequest = (certRequest: any, signer: sawtooth.signing.Signer): Promise<any> => {
    if (!signer) {
        return Promise.reject('A signer must be provided');
    }

    const requestAction = ChangeRequestStatusAction.create({
        requestId: certRequest.requestId,
        status: certRequest.status,
    });

    const payloadBytes = CertificateRegistryPayload.encode({
        action: CertificateRegistryPayload.Action.CHANGE_REQUEST_STATUS_ACTION,
        changeRequestStatusAction: requestAction,
    }).finish();

    const agentAddress = addressing.makeAgentAddress(signer.getPublicKey().asHex());
    const factoryAddress = addressing.makeOrganizationAddress(certRequest.factoryId);
    const certRequestAddress = addressing.makeCertificateRequestAddress(certRequest.requestId);

    const inputs = [agentAddress, factoryAddress, certRequestAddress];
    const outputs = [certRequestAddress];

    return transactionService.submitTransaction(
        {
            payloadBytes,
            inputs: inputs,
            outputs: outputs,
        },
        signer,
    );
};

module.exports = {
    changeCertificateRequest,
    loadCertificateRequests,
    openCertificateRequest,
};
