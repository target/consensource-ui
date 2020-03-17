import * as transactionService from './transaction';
import { makeOrganizationAddress, makeAgentAddress, makeStandardAddress } from '../addressing';
import { CertificateRegistryPayload, AccreditCertifyingBodyAction } from '../protobuf';

const accreditCertifyingBody = (
    accreditationData: AccreditCertifyingBodyAction,
    standardsBodyId: string,
    certifyingBodyId: string,
    signer: sawtooth.signing.Signer,
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
