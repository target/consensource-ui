import * as m from 'mithril';
import { App, Welcome } from 'App/views/retailer';
import { AgentList } from 'App/views/retailer/agent';
import { OrganizationCreate, OrganizationList } from 'App/views/common/organization';
import { Certifications } from 'App/views/retailer/search';
import { FactoryList } from 'App/views/auditor/factory';
import { FactoryProfile } from 'App/views/retailer/factory_profile';

const element = document.getElementById('app');
m.route(element, '/', {
    '/': App.subpage(Welcome),
    '/agents': App.subpage(AgentList),
    '/organizationCreate': App.subpage(OrganizationCreate),
    '/organizations': App.subpage(OrganizationList),
    '/certifications': App.subpage(Certifications),
    '/factories': App.subpage(FactoryList),
    '/certifications/factoryProfile': App.subpage(FactoryProfile),
});
