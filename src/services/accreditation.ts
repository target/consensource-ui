import * as transactionService from 'App/services/transaction';
import { makeOrganizationAddress, makeAgentAddress, makeStandardAddress } from 'App/addressing';
import { CertificateRegistryPayload, AccreditCertifyingBodyAction } from 'App/protobuf';
import { OrganizationId } from 'App/services/organization';
import { Signer } from 'sawtooth-sdk/signing';

const accreditCertifyingBody = (
    accreditationData: AccreditCertifyingBodyAction,
    standardsBodyId: OrganizationId,
    certifyingBodyId: OrganizationId,
    signer: Signer,
): Promise<any> => {
    if (!signer) {
        return Promise.reject('A signer must be provided');
    }

    const accreditCertifyingBodyAction = AccreditCertifyingBodyAction.create(accreditationData);

    const payloadBytes = CertificateRegistryPayload.encode({
        action: CertificateRegistryPayload.Action.ACCREDIT_CERTIFYING_BODY_ACTION,
        accreditCertifyingBodyAction,
    }).finish();

    const certifyingBodyAddress = makeOrganizationAddress(certifyingBodyId);
    const agentOrganizationAddress = makeOrganizationAddress(standardsBodyId);
    const agentAddress = makeAgentAddress(signer.getPublicKey().asHex());
    const standardAddress = makeStandardAddress(accreditationData.standardId);

    return transactionService.submitTransaction(
        {
            payloadBytes,
            inputs: [agentAddress, standardAddress, agentOrganizationAddress, certifyingBodyAddress],
            outputs: [certifyingBodyAddress],
        },
        signer,
    );
};

export { accreditCertifyingBody };
