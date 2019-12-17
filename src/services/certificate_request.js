'use strict'

const m = require('mithril')
const uuidv1 = require('uuid/v1');
const addressing = require('App/addressing')
const transactionService = require('App/services/transaction')
const {
    CertificateRegistryPayload,
    ChangeRequestStatusAction,
    OpenRequestAction,
} = require('App/protobuf')
const { pluck } = require('App/utils')

const loadCertificateRequests = (opts = {}) => {
    let args = pluck(opts, 'factory_id', 'expand')
    return m.request({
        method: 'GET',
        url: '/api/requests',
        data: args
    })
}


const openCertificateRequest = (certRequest, signer) => {
    if (!signer) {
        return Promise.reject('A signer must be provided')
    }

    let requestId = uuidv1()

    let requestAction = OpenRequestAction.create({
        id: requestId,
        standardId: certRequest.standardId,
        requestDate: certRequest.requestDate
    })

    let payloadBytes = CertificateRegistryPayload.encode({
        action: CertificateRegistryPayload.Action.OPEN_REQUEST_ACTION,
        openRequestAction: requestAction
    }).finish()

    let agentAddress = addressing.makeAgentAddress(signer.getPublicKey().asHex())
    let certRequestAddress = addressing.makeCertificateRequestAddress(requestId)
    let factoryAddress = addressing.makeOrganizationAddress(certRequest.factoryId)
    let standardAddress = addressing.makeStandardAddress(certRequest.standardId)

    let inputs = [agentAddress, certRequestAddress, factoryAddress, standardAddress]
    let outputs = [certRequestAddress]

    return transactionService.submitTransaction({
        payloadBytes, 
        inputs: inputs, outputs: outputs
    }, signer)

}


const changeCertificateRequest = (certRequest, signer) => {
    if (!signer) {
        return Promise.reject('A signer must be provided')
    }

    let requestAction = ChangeRequestStatusAction.create({
        requestId: certRequest.requestId,
        status: certRequest.status
    })

    let payloadBytes = CertificateRegistryPayload.encode({
        action: CertificateRegistryPayload.Action.CHANGE_REQUEST_STATUS_ACTION,
        changeRequestStatusAction: requestAction
    }).finish()

    let agentAddress = addressing.makeAgentAddress(signer.getPublicKey().asHex())
    let factoryAddress = addressing.makeOrganizationAddress(
        certRequest.factoryId)
    let certRequestAddress = addressing.makeCertificateRequestAddress(certRequest.requestId)

    let inputs = [agentAddress, factoryAddress, certRequestAddress]
    let outputs = [certRequestAddress]

    return transactionService.submitTransaction({
        payloadBytes, inputs: inputs, outputs: outputs
    }, signer)
}

module.exports = {
    changeCertificateRequest,
    loadCertificateRequests,
    openCertificateRequest
}
