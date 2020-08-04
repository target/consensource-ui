import useAxios from 'axios-hooks';
import { BaseApiRes, ExpansionRef } from 'services/api/utils';
import { OrgResData, StandardResData } from 'services/api';

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

export function fetchCertRequests(params?: CertRequestReqParam) {
  return useAxios<BaseApiRes<CertRequestResData[]>>({
    method: 'GET',
    url: '/api/requests',
    params,
  });
}

export function fetchCertRequestById(
  requestId: string,
  params?: CertRequestReqParam,
) {
  return useAxios<BaseApiRes<CertRequestResData[]>>({
    method: 'GET',
    url: `/api/requests/${requestId}`,
    params,
  });
}
