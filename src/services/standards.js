'use strict'

const m = require('mithril')
const crypto = require("crypto")
const addressing = require('App/addressing')
const transactionService = require('App/services/transaction')
const {
    CertificateRegistryPayload,
    CreateStandardAction,
    UpdateStandardAction
} = require('App/protobuf')


const createStandard = (standardPayloadData, orgId, signer) => {

    if (!signer) {
        return Promise.reject('A signer must be provided')
    }

    if (!orgId) {
        return Promise.reject('An organization must be provided. Please, join or create one.')
    }

    let sha = crypto.createHash("sha256")

    let standardId = sha.update(standardPayloadData.name).digest("hex")

    let createStandardAction = CreateStandardAction.create({
      standardId: standardId,
      name: standardPayloadData.name,
      version: standardPayloadData.version,
      description: standardPayloadData.description,
      link: standardPayloadData.link,
      approvalDate: standardPayloadData.approvalDate,
    })

    let payloadBytes = CertificateRegistryPayload.encode({
        action: CertificateRegistryPayload.Action.CREATE_STANDARD,
        createStandard: createStandardAction
    }).finish()

    let standardAddress = addressing.makeStandardAddress(createStandardAction.standardId)
    let agentAddress = addressing.makeAgentAddress(signer.getPublicKey().asHex())
    let organizationAddress = addressing.makeOrganizationAddress(orgId)

    return transactionService.submitTransaction({
        payloadBytes, inputs: [standardAddress, agentAddress, organizationAddress],
        outputs: [standardAddress]
    }, signer)

}

const updateStandard = (standardPayloadData, orgId, signer) => {

    if (!signer) {
        return Promise.reject('A signer must be provided')
    }

    if (!orgId) {
        return Promise.reject('An organization must be provided. Please, join or create one.')
    }

    let updateStandardAction = UpdateStandardAction.create({
      standardId: standardPayloadData.id,
      version: standardPayloadData.version,
      description: standardPayloadData.description,
      link: standardPayloadData.link,
      approvalDate: standardPayloadData.approvalDate,
    })

    let payloadBytes = CertificateRegistryPayload.encode({
        action: CertificateRegistryPayload.Action.UPDATE_STANDARD,
        updateStandard: updateStandardAction
    }).finish()

    let standardAddress = addressing.makeStandardAddress(updateStandardAction.standardId)
    let agentAddress = addressing.makeAgentAddress(signer.getPublicKey().asHex())
    let organizationAddress = addressing.makeOrganizationAddress(orgId)

    return transactionService.submitTransaction({
        payloadBytes, inputs: [standardAddress, agentAddress, organizationAddress],
        outputs: [standardAddress]
    }, signer)

}

const fetchStandard = (organization_id, standard_id) =>
     m.request({
        method: 'GET',
        url: `/api/standards_body/standards?organization_id=${organization_id}`,
     }).then((standards) => standards.data.filter(standard => standard.standard_id === standard_id)[0])

const loadStandards = (organization_id) =>
    m.request({
        method: 'GET',
        url: `/api/standards_body/standards?organization_id=${organization_id}`,
    })

const listStandards = () =>
  m.request({
    method: 'GET',
    url: `/api/standards`
  })

module.exports = {
  createStandard,
  updateStandard,
  listStandards,
  loadStandards,
  fetchStandard
}
