'use strict'

const m = require('mithril')
const crypto = require("crypto")
const addressing = require('App/addressing')
const transactionService = require('App/services/transaction')
const {
  CertificateRegistryPayload, Organization, Factory,
  CreateOrganizationAction, UpdateOrganizationAction
} = require('App/protobuf')
const { pluck } = require('App/utils')

function create_factory_id(name) {
  let sha = crypto.createHash("sha256")
  return sha.update(name).digest("hex").substring(0, 60)
}

const loadFactories = (opts = {}) => {
  let args = pluck(opts, 'name')
  return m.request({
    method: 'GET',
    url: '/api/factories',
    data: args
  })
}

const fetchFactory = (organization_id, opts = {}) => {
  let params = pluck(opts, 'expand')
  return m.request({
    method: 'GET',
    url: `/api/factories/${organization_id}`,
    data: params
  })
}

const createFactoryTransaction = (factory, signer) => {

  if (!signer) {
    return Promise.reject('A signer must be provided')
  }

  let factory_id = create_factory_id(factory.orgName)

  let createAction = CreateOrganizationAction.create({
    id: factory_id,
    organizationType: Organization.Type.FACTORY,
    name: factory.orgName,
    contacts: [Organization.Contact.create({
      name: factory.contactName,
      phoneNumber: factory.contactPhoneNumber,
      languageCode: factory.contactLanguageCode,
    })],
    address: Factory.Address.create({
      streetLine_1: factory.addressStreetLine1,
      streetLine_2: factory.addressStreetLine2,
      city: factory.addressCity,
      stateProvince: factory.addressStateProvince,
      country: factory.addressCountry,
      postalCode: factory.addressPostalCode,
    }),
  })

  let payloadBytes = CertificateRegistryPayload.encode({
    action: CertificateRegistryPayload.Action.CREATE_ORGANIZATION,
    createOrganization: createAction
  }).finish()

  let factoryAddress = addressing.makeOrganizationAddress(factory_id)
  let agentAddress = addressing.makeAgentAddress(signer.getPublicKey().asHex())

  return transactionService.createTransaction({
    payloadBytes,
    inputs: [factoryAddress, agentAddress], outputs: [factoryAddress, agentAddress]
  }, signer)
}

const createFactory = (factory, signer) =>
  transactionService.submitBatch([createFactoryTransaction(factory, signer)], signer)

const updateFactory = (factory, signer) => {
  if (!signer) {
    return Promise.reject('A signer must be provided')
  }

  let updateAction = UpdateOrganizationAction.create({
    address: Factory.Address.create({
      streetLine_1: factory.addressStreetLine1,
      streetLine_2: factory.addressStreetLine2,
      city: factory.addressCity,
      stateProvince: factory.addressStateProvince,
      country: factory.addressCountry,
      postalCode: factory.addressPostalCode,
    }),
    contacts: [Organization.Contact.create({
      name: factory.contactName,
      phoneNumber: factory.contactPhoneNumber,
      languageCode: factory.contactLanguageCode,
    })]
  })

  let payloadBytes = CertificateRegistryPayload.encode({
    action: CertificateRegistryPayload.Action.UPDATE_ORGANIZATION,
    updateOrganization: updateAction
  }).finish()

  let factoryAddress = addressing.makeOrganizationAddress(create_factory_id(factory.name))
  let agentAddress = addressing.makeAgentAddress(signer.getPublicKey().asHex())

  return transactionService.submitTransaction({
    payloadBytes, inputs: [factoryAddress, agentAddress], outputs: [factoryAddress, agentAddress]
  }, signer)
}

module.exports = {
  loadFactories,
  fetchFactory,
  createFactoryTransaction,
  createFactory,
  updateFactory
}
