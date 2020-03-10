'use strict'

const transactionService = require('App/services/transaction')
const addressing = require('App/addressing')
const {
    CertificateRegistryPayload,
    AccreditCertifyingBodyAction,
} = require('App/protobuf')

const accreditCertifyingBody = (accreditationData, standardsBodyId, certifyingBodyId,  signer) => {
    if (!signer) {
        return Promise.reject('A signer must be provided')
    }
    let accreditCertifyingBodyAction =
        AccreditCertifyingBodyAction.create({
            certifyingBodyId: accreditationData.certifyingBodyId,
            standardId: accreditationData.standardId,
            validFrom: accreditationData.validFrom,
            validTo: accreditationData.validTo,
        })

    let payloadBytes = CertificateRegistryPayload.encode({
        action: CertificateRegistryPayload.Action.ACCREDIT_CERTIFYING_BODY_ACTION,
        accreditCertifyingBodyAction
    }).finish()

    let certifyingBodyAddress =
        addressing.makeOrganizationAddress(certifyingBodyId)
    let agentOrganizationAddress =
        addressing.makeOrganizationAddress(standardsBodyId)
    let agentAddress =
        addressing.makeAgentAddress(signer.getPublicKey().asHex())
    let standardAddress =
        addressing.makeStandardAddress(accreditationData.standardId)

    return transactionService.submitTransaction({
        payloadBytes, inputs: [agentAddress, standardAddress, agentOrganizationAddress, certifyingBodyAddress],
        outputs: [certifyingBodyAddress]
    }, signer)
}

module.exports = {
    accreditCertifyingBody
}
