import axios from 'axios';
import { PaginatedApiRes } from './utils';

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

export async function loadCertificates(params?: CertReqParam) {
  const path = '/api/certificates';

  const res = await axios
    .get<PaginatedApiRes<CertResData[]>>(path, { params })
    .catch(({ message }: Error) => {
      throw new Error(`Failed to GET ${path}: ${message}`);
    });

  return res.data;
}
