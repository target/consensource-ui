export interface Paging {
  first: string;
  last: string;
  limit: number;
  next: string;
  offset: number;
  prev: string;
  total: number;
}

/**
 * Base response object that most of the API
 * endpoints adhere to.
 */
export interface ApiRes<T = {}> {
  data: Array<T>;
  link?: string;
  head?: number;
  paging?: Paging;
}

export interface ExpansionRef {
  id: string;
  link: string;
}
