'use strict'

const m = require('mithril')
const { pluck } = require('App/utils')
const addressing = require('App/addressing')
const transactionService = require('App/services/transaction')
const {
    CertificateRegistryPayload,
    IssueCertificateAction,
} = require('App/protobuf')


const queryCertifications = (_queryParams) =>
  Promise.resolve([])


const issueCertificate = (issueCertificateData, orgId, factoryId, signer) => {

    if (!signer) {
        return Promise.reject('A signer must be provided')
    }

    if (!orgId) {
        return Promise.reject('An organization must be provided. Please, join or create one.')
    }

    let issueCertificateAction = IssueCertificateAction.create({
      id: issueCertificateData.id,
      requestId: issueCertificateData.requestId,
      validFrom: issueCertificateData.validFrom,
      validTo: issueCertificateData.validTo,
      source: IssueCertificateAction.Source.FROM_REQUEST
    })

    let payloadBytes = CertificateRegistryPayload.encode({
        action: CertificateRegistryPayload.Action.ISSUE_CERTIFICATE,
        issueCertificate: issueCertificateAction
    }).finish()

    let factoryAddress = addressing.makeOrganizationAddress(factoryId)
    let certRequestAddress = addressing.makeCertificateRequestAddress(issueCertificateData.requestId)
    let agentAddress = addressing.makeAgentAddress(signer.getPublicKey().asHex())
    let organizationAddress = addressing.makeOrganizationAddress(orgId)
    let certificateAddress = addressing.makeCertificateAddress(issueCertificateData.id)

    return transactionService.submitTransaction({
        payloadBytes, inputs: [factoryAddress, certRequestAddress, agentAddress, organizationAddress, certificateAddress],
        outputs: [certRequestAddress, certificateAddress]
    }, signer)

}

const loadCertificates = (opts = {}) => {
  let params = pluck(opts, "factory_id")
  return m.request({
    method: 'GET',
    url: '/api/certificates',
    data: params
  })
}

module.exports = {
  queryCertifications,
  issueCertificate,
  loadCertificates
}
