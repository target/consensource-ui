import axios from 'axios';
import { ApiRes, createReqWithParam } from 'services/api';
import { CertResData } from './certificate';

export interface OrgResAddressData {
  street_line_1: string;
  street_line_2?: string;
  city: string;
  state_province?: string;
  country: string;
  postal_code?: string;
}

export interface OrgResContactData {
  name: string;
  language_code: string;
  phone_number: string;
}

export interface OrgResAuthData {
  public_key: string;
  role: any; // RoleEnum
}

export interface OrgResData {
  id: string;
  name: string;
  contacts: Array<OrgResContactData>;
  authorizations: Array<OrgResAuthData>;
  address?: OrgResAddressData; // `address` only exists on FACTORY org types
  certificates?: Array<CertResData>; // `certificates` only exists on FACTORY org types
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
  const path = createReqWithParam('/api/organizations', params);

  const res = await axios.get(path).catch(({ message }: Error) => {
    throw new Error(`Failed to GET ${path}: ${message}`);
  });

  return res.data;
}

export async function fetchOrganizationById(
  orgId: string,
  params?: OrgReqParams,
): Promise<ApiRes<OrgResData>> {
  const path = createReqWithParam(`/api/organizations/${orgId}`, params);

  const res = await axios.get(path).catch(({ message }: Error) => {
    throw new Error(`Failed to GET ${path}: ${message}`);
  });

  return res.data;
}
