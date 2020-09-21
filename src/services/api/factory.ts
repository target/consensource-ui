import axios from 'axios';
import { BaseApiRes, PaginatedApiRes, SortingReq } from './utils';
import { OrgResData } from './organization';
import { CertResData } from './certificate';

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
  certificates?: CertResData[];
}

export type FactoryReqFilterParams = Partial<FactoryResAddressData> & {
  standard_name?: string; // Only value from `CertResData` we filter/sort on
  address?: string; // Used for full text searches on all address fields
};

export type FactoryReqSortParams = SortingReq<FactoryReqFilterParams>;

/**
 * Allows for optional query filtering/sorting on all fields
 * of `FactoryResAddressData` and the `standard_name` of
 * `CertResData`.
 */
export interface FactoryReqParams
  extends FactoryReqFilterParams,
    FactoryReqSortParams {
  limit?: number;
  offset?: number;
  head?: number;
  expand?: boolean;
}

export async function fetchAllFactories(params?: FactoryReqParams) {
  const res = await axios.get<PaginatedApiRes<FactoryResData[]>>(
    '/api/factories',
    {
      params,
    },
  );

  return res.data;
}

export async function fetchFactoryByOrgId(
  orgId: string,
  params?: FactoryReqParams,
) {
  const res = await axios.get<BaseApiRes<FactoryResData>>(
    `/api/factories/${orgId}`,
    { params },
  );

  return res.data;
}
