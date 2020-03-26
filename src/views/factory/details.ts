import * as m from 'mithril';
import * as agentService from 'App/services/agent';
import * as AuthService from 'App/services/auth';
import * as factoryService from 'App/services/factory';
import * as transactionService from 'App/services/transaction';
import { inputField, languageSelector } from 'App/components/forms';
import * as blockService from 'App/services/block';
import * as isoLangCodes from 'App/views/common/ISO-639-1-language.json';
import Modals from 'App/components/modals';

const _toggleEditPassword = update => {
    const editFields = document.querySelectorAll(`.password-value`);
    editFields.forEach(t => {
        t.classList.toggle('form-control-plaintext');
        t.classList.toggle('form-control');
        t.classList.toggle('mt-2');

        if (t.getAttribute('name') === `currentPassword`) {
            t.setAttribute('placeholder', 'Enter current password');
        }
        if (t.getAttribute('name') === `password`) {
            t.setAttribute('placeholder', 'Enter new password');
        }
        if (t.getAttribute('name') === `confirmPassword`) {
            t.setAttribute('placeholder', 'Confirm new password');
        }
        if (!update) {
            PasswordUpdate.clear();
        }
    });

    const passwordFields = document.querySelectorAll(`.password-fields`);
    passwordFields.forEach(t => {
        t.classList.toggle('show');
        t.classList.toggle('hide');
    });
};

const _toggleEditAddress = (vnode, updated?) => {
    const editFields = document.querySelectorAll(`.address-value`);
    editFields.forEach(t => {
        t.classList.toggle('form-control-plaintext');
        t.classList.toggle('form-control');
        t.classList.toggle('mt-2');
        if (t.classList.contains('optional') && t.classList.contains('empty')) {
            t.classList.toggle('hide');
        }

        if (t.hasAttribute('readonly')) {
            t.removeAttribute('readonly');
            t.setAttribute('placeholder', t.getAttribute('name'));
        } else {
            t.setAttribute('readonly', 'readonly');
            t.removeAttribute('placeholder');
            if (!updated) {
                FactoryUpdate.setFactory(vnode.state.factory);
            }
        }
    });

    const addressButtons = document.querySelectorAll(`.btn-address`);
    addressButtons.forEach(t => {
        t.classList.toggle('show');
        t.classList.toggle('hide');
    });
};

const _toggleEditContact = (vnode, updated?) => {
    const editFields = document.querySelectorAll(`.contact-value`);
    editFields.forEach(t => {
        t.classList.toggle('form-control-plaintext');
        t.classList.toggle('form-control');
        t.classList.toggle('mt-2');

        if (t.classList.contains('select-language')) {
            if (t.hasAttribute('disabled')) {
                t.removeAttribute('disabled');
            } else {
                t.setAttribute('disabled', 'disabled');
            }
        }
        if (t.hasAttribute('readonly')) {
            t.removeAttribute('readonly');
            t.setAttribute('placeholder', t.getAttribute('name'));
        } else {
            t.setAttribute('readonly', 'readonly');
            t.removeAttribute('placeholder');
            if (!updated) {
                FactoryUpdate.setFactory(vnode.state.factory);
            }
        }
        return '';
    });

    const contactButtons = document.querySelectorAll(`.btn-contact`);
    contactButtons.forEach(t => {
        t.classList.toggle('show');
        t.classList.toggle('hide');
        return '';
    });
};

export const FactoryDetails = {
    view: vnode => {
        if (!vnode.state.loading) {
            return [
                FactoryUpdate.errorMsg ? m('p.text-danger', FactoryUpdate.errorMsg) : null,
                m('div.factory-profile-field', 'Factory Name'),
                m('p.factory-profile-value', vnode.state.factory.name),
                m('.row', [
                    m(
                        "input.dt.col-sm-10.password-value.password-fields.form-control-plaintext.hide[type=password][name='currentPassword']",
                        {
                            oninput: (e: any) => PasswordUpdate.setOldPassword(e.target.value),
                            value: PasswordUpdate.old_password,
                        },
                    ),
                ]),
                m('.row', [
                    m(
                        "input.dt.col-sm-10.password-value.password-fields.agent-profile-value.form-control-plaintext.hide[type=password][name='password']",
                        {
                            oninput: (e: any) => PasswordUpdate.setPassword(e.target.value),
                            value: PasswordUpdate.password,
                        },
                    ),
                ]),
                m('.row', [
                    m(
                        "input.dt.col-sm-10.password-value.password-fields.form-control-plaintext.hide[type=password][name='confirmPassword']",
                        {
                            oninput: (e: any) => PasswordUpdate.setConfirmPassword(e.target.value),
                            value: PasswordUpdate.confirmPassword,
                        },
                    ),
                ]),
                m('.row', [
                    m(
                        'button.btn.password-fields.updatePassword.m-2.hide',
                        {
                            onclick: () => {
                                PasswordUpdate.submit();
                                _toggleEditPassword(true);
                            },
                            disabled: PasswordUpdate.submitting || PasswordUpdate.invalidPassword(),
                        },
                        'Update',
                    ),
                    m(
                        'btn.btn.password-fields.cancelUpdate.m-2.hide',
                        { onclick: () => _toggleEditPassword(false) },
                        'Cancel',
                    ),
                ]),
                m('dl.row', [
                    m(
                        'btn.dt-sm-2.btn.password-fields.updatePassword.m-2.show',
                        { onclick: () => _toggleEditPassword(true) },
                        'Update Password',
                    ),
                ]),
                m('div.mt-5', [
                    m('img.edit-icon[src=/assets/images/pencil.svg]', { onclick: () => _toggleEditAddress(vnode) }),
                    m('span.factory-profile-field.ml-2', 'Address'),
                ]),
                m("label.form-label[for='address-street-1']", 'Street Address 1'),
                m(
                    "input#address-street-1.factory-profile-value.address-value.form-control-plaintext[type=text][readonly=true][name='Street Line 1 *']",
                    {
                        oninput: (e: any) => FactoryUpdate.setAddressStreetLine1(e.target.value),
                        value: FactoryUpdate.addressStreetLine1,
                    },
                ),
                m("label.form-label[for='address-street-2']", 'Street Address 2'),
                m(
                    `input#address-street-2.factory-profile-value.address-value.optional.form-control-plaintext[type=text][readonly=true][name='Street Line 2']`,
                    {
                        oninput: (e: any) => FactoryUpdate.setAddressStreetLine2(e.target.value),
                        value: FactoryUpdate.addressStreetLine2,
                        class: !vnode.state.factory.address.street_line_2 ? 'hide empty' : '',
                    },
                ),
                m("label.form-label[for='address-city']", 'City *'),
                m(
                    "input#address-city.factory-profile-value.address-value.form-control-plaintext[type=text][readonly=true][name='City *']",
                    {
                        oninput: (e: any) => FactoryUpdate.setAddressCity(e.target.value),
                        value: FactoryUpdate.addressCity,
                    },
                ),
                m("label.form-label[for='address-state-province']", 'State/Province'),
                m(
                    `input#address-state-province.factory-profile-value.address-value.optional.form-control-plaintext[type=text][readonly=true][name='State/Province']`,
                    {
                        oninput: (e: any) => FactoryUpdate.setAddressStateProvince(e.target.value),
                        value: FactoryUpdate.addressStateProvince,
                        class: !vnode.state.factory.address.state_province ? 'hide empty' : '',
                    },
                ),
                m("label.form-label[for='address-country']", 'Country *'),
                m(
                    "input#address-country.factory-profile-value.address-value.form-control-plaintext[type=text][readonly=true][name='Country *']",
                    {
                        oninput: (e: any) => FactoryUpdate.setAddressCountry(e.target.value),
                        value: FactoryUpdate.addressCountry,
                    },
                ),
                m("label.form-label[for='address-postal-code']", 'Postal Code'),
                m(
                    `input#address-postal-code.factory-profile-value.address-value.optional.form-control-plaintext[type=text][readonly=true][name='Postal Code']`,
                    {
                        oninput: (e: any) => FactoryUpdate.setAddressPostalCode(e.target.value),
                        value: FactoryUpdate.addressPostalCode,
                        class: !vnode.state.factory.address.postal_code ? 'hide empty' : '',
                    },
                ),
                m('.row', [
                    m(
                        'button.btn.btn-address.m-2.updateInformation.hide',
                        {
                            onclick: () => {
                                FactoryUpdate.submit();
                                _toggleEditAddress(vnode, true);
                            },
                            disabled: FactoryUpdate.submitting || FactoryUpdate.invalidFields(),
                        },
                        'Update Address',
                    ),
                    m(
                        'btn.btn.cancelUpdate.m-2.btn-address.hide',
                        { onclick: () => _toggleEditAddress(vnode) },
                        'Cancel',
                    ),
                ]),

                m('div.mt-5', [
                    m('img.edit-icon[src=/assets/images/pencil.svg]', { onclick: () => _toggleEditContact(vnode) }),
                    m('span.factory-profile-field.ml-2', 'Contact Info'),
                ]),
                m("label.form-label[for='contact-name']", 'Name *'),
                m(
                    "input#contact-name.factory-profile-value.contact-value.form-control-plaintext[type=text][readonly=true][name='Name *']",
                    {
                        oninput: (e: any) => FactoryUpdate.setContactName(e.target.value),
                        value: FactoryUpdate.contactName,
                    },
                ),
                m("label.form-label[for='contact-phone-num']", 'Phone Number *'),
                m(
                    "input#contact-phone-num.factory-profile-value.contact-value.form-control-plaintext[type=text][readonly=true][name='Phone Number *']",
                    {
                        oninput: (e: any) => FactoryUpdate.setContactPhoneNumber(e.target.value),
                        value: FactoryUpdate.contactPhoneNumber,
                    },
                ),
                m("label.form-label[for='contact-lang-code']", 'Language *'),
                m(
                    "select#contact-lang-code.factory-profile-value.contact-value.select-language.form-control-plaintext[disabled='disabled'][readonly=true][name='Language *']",
                    {
                        name,
                        oninput: (e: any) => FactoryUpdate.setContactLanguageCode(e.target.value),
                        value: FactoryUpdate.contactLanguageCode,
                    },
                    isoLangCodes.map(({ code, name }) => m('option', { value: code, text: name })),
                ),

                m('.row', [
                    m(
                        'button.btn.btn-contact.updateInformation.m-2.hide',
                        {
                            onclick: () => {
                                FactoryUpdate.submit();
                                _toggleEditContact(vnode, true);
                            },
                            disabled: FactoryUpdate.submitting || FactoryUpdate.invalidFields(),
                        },
                        'Update Contact Info',
                    ),
                    m(
                        'btn.btn.btn-contact.cancelUpdate.m-2.hide',
                        { onclick: () => _toggleEditContact(vnode) },
                        'Cancel',
                    ),
                ]),
                m(Modals.ModalContainer, { show: Modals.displayModal() }),
            ];
        } else {
            return [m('.row', 'Loading...')];
        }
    },
    oncreate: vnode => {
        vnode.state._listener = () => FactoryDetails.loadData(vnode);
        blockService.addBlockUpdateListener(vnode.state._listener);
    },

    onremove: vnode => {
        blockService.removeBlockUpdateListener(vnode.state._listener);
    },

    oninit: vnode => {
        vnode.state.loading = true;
        return AuthService.getUserData()
            .then((user: any) => Promise.all([user, agentService.fetchAgent(user.public_key)]))
            .then(([user, agent]) => Promise.all([user, factoryService.fetchFactory(agent.data.organization.id)]))
            .then(([user, factoryResult]) => {
                vnode.state.loading = false;
                vnode.state.user = user;
                vnode.state.factory = factoryResult.data;
                FactoryUpdate.setFactory(vnode.state.factory);
                PasswordUpdate.setUpdatePassword(user);
                m.redraw();
            })
            .catch(e => {
                console.log(e);
                // sign-up or -in required
                vnode.state.loading = false;
                vnode.state.user = null;
                m.redraw();
            });
    },

    loadData: vnode => {
        factoryService
            .fetchFactory(vnode.state.factory.id)
            .then(factoryResult => {
                vnode.state.loading = false;
                vnode.state.factory = factoryResult.data;
                FactoryUpdate.setFactory(vnode.state.factory);
                m.redraw();
            })
            .catch(e => {
                console.log(e);
                // sign-up or -in required
                vnode.state.loading = false;
                vnode.state.user = null;
                m.redraw();
            });
    },
};

const _signUpSetter = key => value => {
    FactorySignUp[key] = value;
};

const FactorySignUp = {
    submitting: false,
    errorMsg: null,

    username: '',
    password: '',
    confirmPassword: '',

    // Transaction Fields
    agentName: '',
    orgName: '',
    addressStreetLine1: '',
    addressStreetLine2: '',
    addressCity: '',
    addressStateProvince: '',
    addressCountry: '',
    addressPostalCode: '',
    contactName: '',
    contactPhoneNumber: '',
    contactLanguageCode: '',

    setUsername: _signUpSetter('username'),
    setPassword: _signUpSetter('password'),
    setConfirmPassword: _signUpSetter('confirmPassword'),

    setAgentName: _signUpSetter('agentName'),
    setOrgName: _signUpSetter('orgName'),
    setAddressStreetLine1: _signUpSetter('addressStreetLine1'),
    setAddressStreetLine2: _signUpSetter('addressStreetLine2'),
    setAddressCity: _signUpSetter('addressCity'),
    setAddressStateProvince: _signUpSetter('addressStateProvince'),
    setAddressCountry: _signUpSetter('addressCountry'),
    setAddressPostalCode: _signUpSetter('addressPostalCode'),
    setContactName: _signUpSetter('contactName'),
    setContactPhoneNumber: _signUpSetter('contactPhoneNumber'),
    setContactLanguageCode: _signUpSetter('contactLanguageCode'),

    submit: () => {
        FactorySignUp.submitting = true;
        AuthService.createUser(FactorySignUp, signer =>
            transactionService.submitBatch(
                [
                    agentService.createAgentTransaction(FactorySignUp.agentName, signer),
                    factoryService.createFactoryTransaction(FactorySignUp, signer),
                ],
                signer,
            ),
        )
            .then(() => {
                FactorySignUp.clear();
                m.route.set('/');
            })
            .catch(e => {
                console.error(e);
                FactorySignUp.submitting = false;
                FactorySignUp.errorMsg = e;
            });
    },

    clear: () => {
        FactorySignUp.submitting = false;
        FactorySignUp.errorMsg = null;

        FactorySignUp.agentName = '';
        FactorySignUp.username = '';
        FactorySignUp.password = '';
        FactorySignUp.confirmPassword = '';
        FactorySignUp.orgName = '';
        FactorySignUp.addressStreetLine1 = '';
        FactorySignUp.addressStreetLine2 = '';
        FactorySignUp.addressCity = '';
        FactorySignUp.addressStateProvince = '';
        FactorySignUp.addressCountry = '';
        FactorySignUp.addressPostalCode = '';
        FactorySignUp.contactName = '';
        FactorySignUp.contactPhoneNumber = '';
        FactorySignUp.contactLanguageCode = '';
    },

    invalidFields: () => {
        // check the required fields
        const requiredFields = [
            'agentName',
            'username',
            'password',
            'orgMame',
            'addressStreetLine1',
            'addressCity',
            'addressCountry',
            'contactName',
            'contactPhoneNumber',
            'contactLanguageCode',
        ];

        if (requiredFields.reduce((acc, key) => acc || FactorySignUp[key] === '', false)) {
            return true;
        }

        if (FactorySignUp.password !== FactorySignUp.confirmPassword) {
            return true;
        }

        return false;
    },
};

/**
 * Factory Sign Up form component
 */
export const FactorySignUpForm = {
    oninit() {
        FactorySignUp.clear();
    },
    view() {
        return [
            m('h2', 'Sign Up'),
            m('.form', [
                FactorySignUp.errorMsg ? m('p.text-danger', FactorySignUp.errorMsg) : null,

                inputField('agentName', 'Name *', FactorySignUp.agentName, FactorySignUp.setAgentName),
                inputField('username', 'Email *', FactorySignUp.username, FactorySignUp.setUsername),
                inputField('password', 'Password *', FactorySignUp.password, FactorySignUp.setPassword, 'password'),
                inputField(
                    'confirmPassword',
                    'Confirm Password *',
                    FactorySignUp.confirmPassword,
                    FactorySignUp.setConfirmPassword,
                    'password',
                ),

                inputField('orgName', 'Factory Name *', FactorySignUp.orgName, FactorySignUp.setOrgName),

                m('h3', 'Address'),
                inputField(
                    'addressStreetLine1',
                    'Street Line 1 *',
                    FactorySignUp.addressStreetLine1,
                    FactorySignUp.setAddressStreetLine1,
                ),
                inputField(
                    'addressStreetLine2',
                    'Street Line 2',
                    FactorySignUp.addressStreetLine2,
                    FactorySignUp.setAddressStreetLine2,
                ),
                inputField('addressCity', 'City *', FactorySignUp.addressCity, FactorySignUp.setAddressCity),
                inputField(
                    'addressStateProvince',
                    'State/Province',
                    FactorySignUp.addressStateProvince,
                    FactorySignUp.setAddressStateProvince,
                ),
                inputField(
                    'addressCountry',
                    'Country *',
                    FactorySignUp.addressCountry,
                    FactorySignUp.setAddressCountry,
                ),
                inputField(
                    'addressPostalCode',
                    'Postal Code',
                    FactorySignUp.addressPostalCode,
                    FactorySignUp.setAddressPostalCode,
                ),

                m('h3', 'Contact Info'),
                inputField('contactName', 'Name *', FactorySignUp.contactName, FactorySignUp.setContactName),
                inputField(
                    'contactPhoneNumber',
                    'Phone Number *',
                    FactorySignUp.contactPhoneNumber,
                    FactorySignUp.setContactPhoneNumber,
                ),
                languageSelector(
                    'contactLanguageCode',
                    'Language *',
                    FactorySignUp.contactLanguageCode,
                    FactorySignUp.setContactLanguageCode,
                ),
                m(
                    '.row',
                    m(
                        'button.btn.btn-primary',
                        {
                            onclick: FactorySignUp.submit,
                            disabled: FactorySignUp.submitting || FactorySignUp.invalidFields(),
                        },
                        'Sign Up',
                    ),
                ),
            ]),
        ];
    },
};

const _updateSetter = key => value => {
    FactoryUpdate[key] = value;
};

const FactoryUpdate = {
    submitting: false,
    errorMsg: null,

    // Transaction Fields

    // Name is read-only
    name: '',

    // modifiable fields
    addressStreetLine1: '',
    addressStreetLine2: '',
    addressCity: '',
    addressStateProvince: '',
    addressCountry: '',
    addressPostalCode: '',
    contactName: '',
    contactPhoneNumber: '',
    contactLanguageCode: '',

    setAddressStreetLine1: _updateSetter('addressStreetLine1'),
    setAddressStreetLine2: _updateSetter('addressStreetLine2'),
    setAddressCity: _updateSetter('addressCity'),
    setAddressStateProvince: _updateSetter('addressStateProvince'),
    setAddressCountry: _updateSetter('addressCountry'),
    setAddressPostalCode: _updateSetter('addressPostalCode'),
    setContactName: _updateSetter('contactName'),
    setContactPhoneNumber: _updateSetter('contactPhoneNumber'),
    setContactLanguageCode: _updateSetter('contactLanguageCode'),

    submit: () => {
        FactoryUpdate.submitting = true;
        AuthService.getSigner()
            .then(signer => factoryService.updateFactory(FactoryUpdate, signer))
            .then(() => {
                FactoryUpdate.submitting = false;
                m.redraw();
            })
            .catch(e => {
                console.error(e);
                FactoryUpdate.submitting = false;
                FactoryUpdate.errorMsg = e;
                m.redraw();
            });
    },

    setFactory: factory => {
        FactoryUpdate.name = factory.name;

        FactoryUpdate.addressStreetLine1 = factory.address.street_line_1;
        FactoryUpdate.addressStreetLine2 = factory.address.street_line_2 || '';
        FactoryUpdate.addressCity = factory.address.city;
        FactoryUpdate.addressStateProvince = factory.address.state_province || '';
        FactoryUpdate.addressCountry = factory.address.country;
        FactoryUpdate.addressPostalCode = factory.address.postal_code || '';
        FactoryUpdate.contactName = factory.contacts[0].name;
        FactoryUpdate.contactPhoneNumber = factory.contacts[0].phone_number;
        FactoryUpdate.contactLanguageCode = factory.contacts[0].language_code;
    },

    invalidFields: () => {
        // check the required fields
        const requiredFields = [
            'addressStreetLine1',
            'addressCity',
            'addressCountry',
            'contactName',
            'contactPhoneNumber',
            'contactLanguageCode',
        ];
        return requiredFields.reduce((acc, key) => acc || FactoryUpdate[key] === '', false);
    },
};

const _updatePasswordSetter = key => value => {
    PasswordUpdate[key] = value;
};

const PasswordUpdate = {
    submitting: false,
    errorMsg: null,

    public_key: '',
    encrypted_private_key: '',

    old_password: '',
    username: '',
    password: '',
    confirmPassword: '',

    setOldPassword: _updatePasswordSetter('old_password'),
    setPassword: _updatePasswordSetter('password'),
    setConfirmPassword: _updatePasswordSetter('confirmPassword'),

    submit: () => {
        PasswordUpdate.submitting = true;
        AuthService.getSigner()
            .then(signer => {
                AuthService.updateUser(PasswordUpdate, signer);
            })
            .then(() => {
                PasswordUpdate.submitting = false;
                PasswordUpdate.clear();
                m.redraw();
            })
            .catch(e => {
                console.error(e);
                PasswordUpdate.submitting = false;
                PasswordUpdate.errorMsg = e;
                PasswordUpdate.clear();
                m.redraw();
            });
    },

    setUpdatePassword: user => {
        PasswordUpdate.public_key = user.public_key;
        PasswordUpdate.username = user.username;
    },

    clear: () => {
        PasswordUpdate.old_password = '';
        PasswordUpdate.password = '';
        PasswordUpdate.confirmPassword = '';
    },

    invalidPassword: () => {
        if (!PasswordUpdate.old_password || !PasswordUpdate.password || !PasswordUpdate.confirmPassword) {
            return true;
        }
        if (PasswordUpdate.password !== PasswordUpdate.confirmPassword) {
            return true;
        }
        return false;
    },
};
