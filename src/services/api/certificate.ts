import axios from 'axios';
import { BaseApiRes, PaginatedApiRes } from './utils';

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
  const res = await axios.get<PaginatedApiRes<CertResData[]>>(
    '/api/certificates',
    { params },
  );

  return res.data;
}

export async function fetchCertificateById(
  certId: string,
  params?: CertReqParam,
) {
  const res = await axios.get<BaseApiRes<CertResData>>(
    `/api/certificates/${certId}`,
    { params },
  );

  return res.data;
}
