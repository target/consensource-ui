import axios from 'axios';
import { BaseApiRes, ExpansionRef } from './utils';
import { StandardResData } from './standard';
import { OrgResData } from './organization';

export enum CertReqStatusEnum {
  Open,
  InProgress,
  Closed,
  Certified,
  UnsetStatus,
}

export interface CertRequestResData {
  id: string;
  factory: ExpansionRef | OrgResData;
  standard: ExpansionRef | StandardResData;
  status: CertReqStatusEnum;
  request_date: number;
}

export interface CertRequestReqParam {
  expand?: boolean;
  factory_id?: string;
  limit?: number;
  offset?: number;
  head?: number;
}

export async function fetchCertRequests(params?: CertRequestReqParam) {
  const res = await axios.get<BaseApiRes<CertRequestResData[]>>(
    '/api/requests',
    {
      params,
    },
  );

  return res.data;
}

export async function fetchCertRequestById(
  requestId: string,
  params?: CertRequestReqParam,
) {
  const res = await axios.get<BaseApiRes<CertRequestResData>>(
    `/api/requests/${requestId}`,
    { params },
  );

  return res.data;
}
