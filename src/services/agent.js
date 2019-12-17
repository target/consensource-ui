'use strict'

const m = require('mithril')
const addressing = require('App/addressing')
const transactionService = require('App/services/transaction')
const { CertificateRegistryPayload, CreateAgentAction } = require('App/protobuf')


const loadAgents = () =>
  m.request({
    method: 'GET',
    url: '/api/agents',
  })

const fetchAgent = (public_key) =>
  m.request({
    method: 'GET',
    url: `/api/agents/${public_key}`
  })

const createAgentTransaction = (name, signer) => {
  if (!signer) {
    throw new Error('A signer must be provided')
  }

  let createAgent = CreateAgentAction.create({
    name: name,
    timestamp: Math.round(Date.now() / 1000)
  })
  let payloadBytes = CertificateRegistryPayload.encode({
    action: CertificateRegistryPayload.Action.CREATE_AGENT,
    createAgent
  }).finish()

  let agentAddress = addressing.makeAgentAddress(signer.getPublicKey().asHex())
  return transactionService.createTransaction({
    payloadBytes, inputs: [agentAddress], outputs: [agentAddress]
  }, signer)
}

const createAgent = (name, signer) =>
  transactionService.submitBatch([createAgentTransaction(name, signer)], signer)

module.exports = {
  createAgent,
  createAgentTransaction,
  loadAgents,
  fetchAgent,
}
