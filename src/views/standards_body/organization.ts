import { Organization as OrganizationProto } from 'App/protobuf';
import { Organization, OrganizationCreate } from 'App/views/common/organization';

export const CreateStandardsBody = {
    oninit: vnode => {
        vnode.state.organization = Organization;
        vnode.state.organization.setType(OrganizationProto.Type.STANDARDS_BODY);
    },
    view: OrganizationCreate.view,
};
