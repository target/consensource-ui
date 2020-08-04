import useAxios from 'axios-hooks';
import { PaginatedApiRes } from 'services/api/utils';

export interface CertResData {
  id: string;
  certifying_body_id: string;
  certifying_body: string;
  factory_id: string;
  factory_name: string;
  standard_id: string;
  standard_name: string;
  standard_version: string;
  valid_from: number;
  valid_to: number;
  assertion_id?: string;
}

export interface CertReqParam {
  certifying_body_id?: string;
  factory_id?: string;
  limit?: number;
  offset?: number;
  head?: number;
}

export function loadCertificates(params?: CertReqParam) {
  return useAxios<PaginatedApiRes<CertResData[]>>({
    method: 'GET',
    url: '/api/certificates',
    params,
  });
}
