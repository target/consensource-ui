import axios from 'axios';
import { Organization } from 'services/protobuf/compiled';
import { BaseApiRes, PaginatedApiRes } from './utils';

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

export async function fetchOrganizations(params?: OrgReqParams) {
  const res = await axios.get<PaginatedApiRes<OrgResData[]>>(
    '/api/organizations',
    { params },
  );

  return res.data;
}

export async function fetchOrganizationById(
  orgId: string,
  params?: OrgReqParams,
) {
  const res = await axios.get<BaseApiRes<OrgResData>>(
    `/api/organizations/${orgId}`,
    { params },
  );

  return res.data;
}
