import { BaseApiRes, PaginatedApiRes, SortingReq } from 'services/api/utils';
import { OrgResData, CertResData } from 'services/api';
import useAxios from 'axios-hooks';

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
  certificates?: Array<CertResData>;
  assertion_id?: string;
}

export type FactoryReqFilterSortParams = Partial<FactoryResAddressData> & {
  standard_name?: string; // Only value from `CertResData` we filter/sort on
};

/**
 * Allows for optional query filtering/sorting on all fields
 * of `FactoryResAddressData` and the `standard_name` of
 * `CertResData`.
 */
export interface FactoryReqParams
  extends FactoryReqFilterSortParams,
    SortingReq<FactoryReqFilterSortParams> {
  limit?: number;
  offset?: number;
  head?: number;
  expand?: boolean;
}

export function fetchAllFactories(params?: FactoryReqParams) {
  return useAxios<PaginatedApiRes<FactoryResData[]>>({
    method: 'GET',
    url: '/api/factories',
    params,
  });
}

export function fetchFactoryByOrgId(orgId: string, params?: FactoryReqParams) {
  return useAxios<BaseApiRes<FactoryResData>>({
    method: 'GET',
    url: `/api/factories/${orgId}`,
    params,
  });
}
