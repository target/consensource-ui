export function createReqWithParam(path: string, params?: BaseReqParams) {
  if (!params) {
    return path;
  }

  const pathWithParams = Object.entries(params).reduce((acc, [param, val]) => {
    return `${acc}${param}=${val}&`;
  }, `${path}?`);

  // Remove trailing `&` symbol
  const pathWithoutTrailingSymbol = pathWithParams.slice(0, -1);

  return pathWithoutTrailingSymbol;
}

export interface BaseReqParams {
  expand?: boolean;
  limit?: number;
  offset?: number;
  head?: number;
}

export interface Paging {
  first: string;
  last: string;
  limit: number;
  next: string;
  offset: number;
  prev: string;
  total: number;
}

export interface ApiRes<T = {}> {
  data?: Array<T>;
  link?: string;
  head?: number;
  paging?: Paging;
}
