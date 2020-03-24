import * as m from 'mithril';
import * as FeatureFlagService from 'App/services/feature_flag';
import { SignInForm } from 'App/views/common/auth';
import { App, Welcome } from 'App/views/factory';
import { FactorySignUpForm, FactoryDetails } from 'App/views/factory/details';
import * as AuthService from 'App/services/auth';
import { ListCertifications } from 'App/views/factory/requests';

AuthService.setNamespace('factory');

const element = document.getElementById('app');

m.route(element, '/', {
    '/': App.subpage(Welcome),
    '/signUp': App.subpage(FeatureFlagService.isSignupEnabled() && FactorySignUpForm),
    '/signIn': App.subpage(SignInForm),
    '/profile': App.subpage(FactoryDetails),
    '/requests': App.subpage(ListCertifications),
});
