import axios from 'axios';
import { ApiRes } from 'services/api/utils';
import { OrgResData } from 'services/api/organization';
import { CertResData } from 'services/api/certificate';

export interface FactoryResAddressData {
  street_line_1: string;
  street_line_2?: string;
  city: string;
  state_province?: string;
  country: string;
  postal_code?: string;
}

export interface FactoryResData extends OrgResData {
  address: FactoryResAddressData;
  certificates: Array<CertResData> | null;
  assertion_id?: string;
}

export interface FactoryReqParams {
  name?: string;
  limit?: number;
  offset?: number;
  head?: number;
  expand?: boolean;
}

export async function fetchAllFactories(
  params?: FactoryReqParams,
): Promise<ApiRes<FactoryResData[]>> {
  const path = '/api/factories';

  const res = await axios.get(path, { params }).catch(({ message }: Error) => {
    throw new Error(`Failed to GET ${path}: ${message}`);
  });

  return res.data;
}

export async function fetchFactoryByOrgId(
  orgId: string,
  params?: FactoryReqParams,
): Promise<ApiRes<FactoryResData>> {
  const path = `/api/factories/${orgId}`;

  const res = await axios.get(path, { params }).catch(({ message }: Error) => {
    throw new Error(`Failed to GET ${path}: ${message}`);
  });

  return res.data;
}
