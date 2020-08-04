import axios from 'axios';
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

export async function fetchCertRequests(params?: CertRequestReqParam) {
  const path = '/api/requests';

  const res = await axios
    .get<BaseApiRes<CertRequestResData[]>>(path, { params })
    .catch(({ message }: Error) => {
      throw new Error(`Failed to GET ${path}: ${message}`);
    });

  return res.data;
}

export async function fetchCertRequestById(
  requestId: string,
  params?: CertRequestReqParam,
) {
  const path = `/api/requests/${requestId}`;

  const res = await axios
    .get<BaseApiRes<CertRequestResData>>(path, { params })
    .catch(({ message }: Error) => {
      throw new Error(`Failed to GET ${path}: ${message}`);
    });

  return res.data;
}
