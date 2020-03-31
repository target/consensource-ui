import * as m from 'mithril';
import * as FeatureFlagService from 'App/services/feature_flag';
import { App, Welcome } from 'App/views/auditor';
import { AgentProfile } from 'App/views/common/profile';
import { SignInForm, AgentSignUpForm } from 'App/views/common/auth';
import { CreateCertifyingBody } from 'App/views/auditor/organization';
import { FactoryList } from 'App/views/auditor/factory';
import { RequestList } from 'App/views/auditor/requests';
import { CertificateCreate, CertificateList } from 'App/views/auditor/certificates';
import AuthService from 'App/services/auth';

AuthService.setNamespace('auditor');

const element = document.getElementById('app');

m.route(element, '/', {
    '/': App.subpage(Welcome),

    '/signIn': App.subpage(SignInForm),
    '/signUp': App.subpage(FeatureFlagService.isSignupEnabled() && AgentSignUpForm),
    '/profile': App.subpage(AgentProfile),

    '/organizationCreate': App.subpage(CreateCertifyingBody),

    '/requests': App.subpage(RequestList),
    '/factories': App.subpage(FactoryList),

    '/certificateCreate': App.subpage(CertificateCreate),
    '/certificates': App.subpage(CertificateList),
});
