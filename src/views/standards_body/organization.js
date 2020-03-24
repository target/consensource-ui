'use strict';

const { Organization: OrganizationProto } = require('App/protobuf');
const { Organization, OrganizationCreate } = require('App/views/common/organization');

const CreateStandardsBody = {
    oninit: vnode => {
        vnode.state.organization = Organization;
        vnode.state.organization.setType(OrganizationProto.Type.STANDARDS_BODY);
    },
    view: vnode => OrganizationCreate.view(vnode),
};

module.exports = {
    CreateStandardsBody,
};
