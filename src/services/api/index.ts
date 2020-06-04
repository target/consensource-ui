/**
 * Formats a URL path string with the key/val pairs from params.
 *
 * Example:
 *
 * ```ts
 * // returns => '/test?key1=val1&key2=val2'
 * createReqWithParam('/test', {'key1': 'val1', 'key2': 'val2'})
 *
 * // returns => '/test'
 * createReqWithParam('/test')
 * ```
 */
export function createReqWithParam(path: string, params?: Record<string, any>) {
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
  data?: Array<T>;
  link?: string;
  head?: number;
  paging?: Paging;
}
