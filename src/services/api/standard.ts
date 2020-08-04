import axios from 'axios';
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

export async function fetchAllOrgStandards(params?: StandardBodyReqParams) {
  const path = '/api/standards_body/standards';

  const res = await axios
    .get<BaseApiRes<StandardBodyResData[]>>(path, { params })
    .catch(({ message }: Error) => {
      throw new Error(`Failed to GET ${path}: ${message}`);
    });

  return res.data;
}

export async function fetchAllStandards(params?: StandardReqParams) {
  const path = '/api/standards';

  const res = await axios
    .get<BaseApiRes<StandardResData[]>>(path, { params })
    .catch(({ message }: Error) => {
      throw new Error(`Failed to GET ${path}: ${message}`);
    });

  return res.data;
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
