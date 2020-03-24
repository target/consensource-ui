import * as m from 'mithril';
import { pluck } from 'App/utils';
import * as addressing from 'App/addressing';
import * as transactionService from 'App/services/transaction';
import { CertificateRegistryPayload, IssueCertificateAction } from 'App/protobuf';

export const queryCertifications = (_queryParams: any) => Promise.resolve([]);

interface Issuance {
    id: string;
    requestId: string;
    validFrom: number;
    validTo: number;
}

export const issueCertificate = (
    issueCertificateData: Issuance,
    orgId: string,
    factoryId: string,
    signer: sawtooth.signing.Signer,
): Promise<any> => {
    if (!signer) {
        return Promise.reject('A signer must be provided');
    }

    if (!orgId) {
        return Promise.reject('An organization must be provided. Please, join or create one.');
    }

    const issueCertificateAction = IssueCertificateAction.create({
        id: issueCertificateData.id,
        requestId: issueCertificateData.requestId,
        validFrom: issueCertificateData.validFrom,
        validTo: issueCertificateData.validTo,
        source: IssueCertificateAction.Source.FROM_REQUEST,
    });

    const payloadBytes = CertificateRegistryPayload.encode({
        action: CertificateRegistryPayload.Action.ISSUE_CERTIFICATE,
        issueCertificate: issueCertificateAction,
    }).finish();

    const factoryAddress = addressing.makeOrganizationAddress(factoryId);
    const certRequestAddress = addressing.makeCertificateRequestAddress(issueCertificateData.requestId);
    const agentAddress = addressing.makeAgentAddress(signer.getPublicKey().asHex());
    const organizationAddress = addressing.makeOrganizationAddress(orgId);
    const certificateAddress = addressing.makeCertificateAddress(issueCertificateData.id);

    return transactionService.submitTransaction(
        {
            payloadBytes,
            inputs: [factoryAddress, certRequestAddress, agentAddress, organizationAddress, certificateAddress],
            outputs: [certRequestAddress, certificateAddress],
        },
        signer,
    );
};

export const loadCertificates = (opts = {}): Promise<any> => {
    const params = pluck(opts, 'factory_id');
    return m.request({
        method: 'GET',
        url: '/api/certificates',
        params: params,
    });
};
