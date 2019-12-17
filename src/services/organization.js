'use strict'

const m = require('mithril')
const uuidv1 = require('uuid/v1');
const { pluck } = require('App/utils')
const addressing = require('../addressing')
const transactionService = require('../services/transaction')
const { CertificateRegistryPayload, CreateOrganizationAction} = require('App/protobuf')
const isoLangCodes = require('../views/common/ISO-639-1-language.json')

const loadOrganizations = (opts = {}) => {
    let params = pluck(opts, 'organization_type')
    return m.request({
        method: 'GET',
        url: '/api/organizations',
        data: params
    })
}

const fetchOrganization = (organizationId) =>
    m.request({
        method: 'GET',
        url: `/api/organizations/${organizationId}`
    })


const createOrganization = (name, type, contact, signer) => {
    if (!name) {
        throw new Error('An organization name must be provided.')
    } else if (!type) {
        throw new Error('An organization type must be provided.')
    }
    let organization_id = uuidv1()
    let createOrganization = CreateOrganizationAction.create({
        id: organization_id,
        name: name,
        organizationType: type,
        contacts: [contact]
    })
    let payloadBytes = CertificateRegistryPayload.encode({
        action: CertificateRegistryPayload.Action.CREATE_ORGANIZATION,
        createOrganization
    }).finish()

    let organizationAddress = addressing.makeOrganizationAddress(organization_id)
    let agentAddress = addressing.makeAgentAddress(signer.getPublicKey().asHex())

    return transactionService.submitTransaction({
        payloadBytes, inputs: [organizationAddress, agentAddress], outputs: [organizationAddress, agentAddress]
    }, signer)
}

const languageLabel = (currentCode) => {
  let langInfo = isoLangCodes.find(({code}) => code === currentCode)
  if (langInfo) {
    return langInfo.name
  } else {
    return "Unknown"
  }
}


module.exports = {
    createOrganization,
    loadOrganizations,
    fetchOrganization,
    languageLabel
}
