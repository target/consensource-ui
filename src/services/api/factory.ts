import axios from 'axios';
import { BaseApiRes, PaginatedApiRes, SortingReq } from 'services/api/utils';
import { OrgResData, CertResData } from 'services/api';

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

export async function fetchAllFactories(
  params?: FactoryReqParams,
): Promise<PaginatedApiRes<FactoryResData[]>> {
  const path = '/api/factories';

  const res = await axios.get(path, { params }).catch(({ message }: Error) => {
    throw new Error(`Failed to GET ${path}: ${message}`);
  });

  return res.data;
}

export async function fetchFactoryByOrgId(
  orgId: string,
  params?: FactoryReqParams,
): Promise<BaseApiRes<FactoryResData>> {
  const path = `/api/factories/${orgId}`;

  const res = await axios.get(path, { params }).catch(({ message }: Error) => {
    throw new Error(`Failed to GET ${path}: ${message}`);
  });

  return res.data;
}
