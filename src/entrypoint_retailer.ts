import * as m from 'mithril';
import { App, Welcome } from 'App/views/retailer';
import { AgentList } from 'App/views/retailer/agent';
import { OrganizationCreate, OrganizationList } from 'App/views/common/organization';
import { Certifications } from 'App/views/retailer/search';
import { FactoryList } from 'App/views/auditor/factory';
import { FactoryProfile } from 'App/views/retailer/factory_profile';
import { SignInForm, AgentSignUpForm } from 'App/views/common/auth';
import * as FeatureFlagService from 'App/services/feature_flag';
import { AgentProfile } from 'App/views/common/profile';

const element = document.getElementById('app');

m.route(element, '/', {
    '/': App.subpage(Welcome),
    '/signUp': App.subpage(FeatureFlagService.isSignupEnabled() && AgentSignUpForm),
    '/signIn': App.subpage(SignInForm),
    '/agents': App.subpage(AgentList),
    '/profile': App.subpage(AgentProfile),
    '/organizationCreate': App.subpage(OrganizationCreate),
    '/organizations': App.subpage(OrganizationList),
    '/certifications': App.subpage(Certifications),
    '/factories': App.subpage(FactoryList),
    '/certifications/factoryProfile': App.subpage(FactoryProfile),
});
