import axios from 'axios';
import { ApiRes } from 'services/api/utils';
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

export async function fetchOrganizations(
  params?: OrgReqParams,
): Promise<ApiRes<OrgResData>> {
  const path = '/api/organizations';

  const res = await axios.get(path, { params }).catch(({ message }: Error) => {
    throw new Error(`Failed to GET ${path}: ${message}`);
  });

  return res.data;
}

export async function fetchOrganizationById(
  orgId: string,
  params?: OrgReqParams,
): Promise<ApiRes<OrgResData>> {
  const path = `/api/organizations/${orgId}`;

  const res = await axios.get(path, { params }).catch(({ message }: Error) => {
    throw new Error(`Failed to GET ${path}: ${message}`);
  });

  return res.data;
}
