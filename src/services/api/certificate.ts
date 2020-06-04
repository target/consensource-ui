import axios from 'axios';
import { ApiRes, createReqWithParam } from 'services/api';

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
}

export interface CertReqParam {
  certifying_body_id?: string;
  factory_id?: string;
  limit?: number;
  offset?: number;
  head?: number;
}

export async function loadCertificates(
  params?: CertReqParam,
): Promise<ApiRes<CertResData>> {
  const path = createReqWithParam('/api/certificates', params);

  const res = await axios.get(path).catch(({ message }: Error) => {
    throw new Error(`Failed to GET ${path}: ${message}`);
  });

  return res.data;
}
