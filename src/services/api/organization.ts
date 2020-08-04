import useAxios from 'axios-hooks';
import { BaseApiRes, PaginatedApiRes } from 'services/api/utils';
import { Organization } from 'services/protobuf/compiled';

export interface OrgResContactData {
  name: string;
  language_code: string;
  phone_number: string;
}

export interface OrgResAuthData {
  public_key: string;
  role: any; // TODO: RoleEnum
}

export interface OrgResData {
  id: string;
  name: string;
  contacts: Array<OrgResContactData>;
  authorizations: Array<OrgResAuthData>;
  organization_type: Organization.Type;
}

export interface OrgReqParams {
  name?: string;
  organization_type?: Organization.Type;
  limit?: number;
  offset?: number;
  head?: number;
}

export function fetchOrganizations(params?: OrgReqParams) {
  return useAxios<PaginatedApiRes<OrgResData[]>>({
    method: 'GET',
    url: '/api/organizations',
    params,
  });
}

export function fetchOrganizationById(orgId: string, params?: OrgReqParams) {
  return useAxios<BaseApiRes<OrgResData>>({
    method: 'GET',
    url: `/api/organizations/${orgId}`,
    params,
  });
}
