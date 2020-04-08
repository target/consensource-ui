import { Organization as OrganizationProto } from 'App/protobuf';
import { Organization, OrganizationCreate } from 'App/views/common/organization';

export const CreateCertifyingBody = {
    oninit: (vnode): void => {
        vnode.state.organization = Organization;
        vnode.state.organization.setType(OrganizationProto.Type.CERTIFYING_BODY);
    },
    view: OrganizationCreate.view,
};
