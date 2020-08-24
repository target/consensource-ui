export interface PagingRes {
  first: string;
  last: string;
  limit: number;
  next: string;
  offset: number;
  prev: string;
  total: number;
}

export type SortingDir = 'asc' | 'desc';

// TODO: Backend implementation for sorting
export interface SortingReq<T> {
  sort_key?: keyof T;
  sort_dir?: SortingDir;
}

/**
 * Base response object
 */
export interface BaseApiRes<T = {}> {
  data: T;
}

export interface PaginatedApiRes<T = {}> extends BaseApiRes<T> {
  link: string;
  head: number;
  paging: PagingRes;
}

export interface ExpansionRef {
  id: string;
  link: string;
}
