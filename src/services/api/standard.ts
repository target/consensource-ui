import useAxios from 'axios-hooks';
import { BaseApiRes } from 'services/api/utils';

export interface StandardVersionResData {
  version: string;
  external_link: string;
  description: string;
  approval_date: number;
}

export interface StandardBodyResData {
  standard_id: string;
  organization_id: string;
  name: string;
  versions: Array<StandardVersionResData>;
  assertion_id?: string;
}

export interface StandardResData {
  standard_id: string;
  standard_name: string;
}

export interface StandardReqParams {
  organization_id?: string;
  head?: number;
}

export interface StandardBodyReqParams {
  organization_id?: string;
  head?: number;
  limit?: number;
  offset?: number;
}

export function fetchAllOrgStandards(params?: StandardBodyReqParams) {
  return useAxios<BaseApiRes<StandardBodyResData[]>>({
    method: 'GET',
    url: '/api/standards_body/standards',
    params,
  });
}

export function fetchAllStandards(params?: StandardReqParams) {
  return useAxios<BaseApiRes<StandardResData[]>>({
    method: 'GET',
    url: '/api/standards',
    params,
  });
}

// DEPRECATED
//
// TODO: Implement this logic on the backend
//
//
// export function fetchStandard(
//   standardId: string,
//   params?: StandardBodyReqParams,
// ): Promise<StandardBodyResData | null> {
//   const allOrgStandards = await fetchAllOrgStandards(params);

//   const matchingStandard = allOrgStandards.data.find(
//     (standard) => standard.standard_id === standardId,
//   );

//   return matchingStandard || null;
// }
