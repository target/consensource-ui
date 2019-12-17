'use strict'

const m = require('mithril')

const { App, Welcome } = require('App/views/retailer')
const { AgentList } = require('App/views/retailer/agent')
const { OrganizationCreate, OrganizationList } = require('App/views/common/organization')
const { Certifications } = require('App/views/retailer/search')
const { FactoryList } = require('App/views/auditor/factory')
const { FactoryProfile } = require('App/views/retailer/factory_profile')

let element = document.getElementById("app")
m.route(element, "/", {
  '/': App.subpage(Welcome),

  '/agents': App.subpage(AgentList),
  '/organizationCreate': App.subpage(OrganizationCreate),
  '/organizations': App.subpage(OrganizationList),
  '/certifications': App.subpage(Certifications),
  '/factories': App.subpage(FactoryList),
  '/certifications/factoryProfile': App.subpage(FactoryProfile),
})
