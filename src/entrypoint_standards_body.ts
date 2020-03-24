import * as m from 'mithril';
import * as FeatureFlagService from 'App/services/feature_flag';
import { App, Welcome } from 'App/views/standards_body';
import { AgentProfile } from 'App/views/common/profile';
import { SignInForm, AgentSignUpForm } from 'App/views/common/auth';
import { CreateStandardsBody } from 'App/views/standards_body/organization';
import { StandardCreate, StandardList, StandardUpdate } from 'App/views/standards_body/standard';
import { CertifyingBodyList } from 'App/views/standards_body/certifying_body';
import { AccreditCertifyingBody } from 'App/views/standards_body/accreditations';
import * as AuthService from 'App/services/auth';

AuthService.setNamespace('standards_body');
const element = document.getElementById('app');
m.route(element, '/', {
    '/': App.subpage(Welcome),

    '/signIn': App.subpage(SignInForm),
    '/signUp': App.subpage(FeatureFlagService.isSignupEnabled() && AgentSignUpForm),
    '/profile': App.subpage(AgentProfile),

    '/organizationCreate': App.subpage(CreateStandardsBody),
    '/standardsCreate': App.subpage(StandardCreate),
    '/standardsList': App.subpage(StandardList),
    '/standardsUpdate': App.subpage(StandardUpdate),

    '/certifyingBodyList': App.subpage(CertifyingBodyList),
    '/accreditCertifyingBody': App.subpage(AccreditCertifyingBody),
});
