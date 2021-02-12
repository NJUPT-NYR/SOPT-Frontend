import { match } from "path-to-regexp";
import qs from "query-string";

interface IUrlMatched {
  params?: any;
  query?: any;
  isMatched: boolean;
}

/**
 * @param {string} pattern
 * @param {string} target
 */
export function urlMatch(pattern: string, target: string): IUrlMatched {
  pattern = pattern.trim();
  const [pathStr, queryStr] = target.split("?");
  const matched = match(pattern)(pathStr);
  if (!matched) {
    return {
      isMatched: false,
    };
  }
  const query = qs.parse(queryStr);
  return {
    isMatched: true,
    params: matched.params,
    query,
  };
}
