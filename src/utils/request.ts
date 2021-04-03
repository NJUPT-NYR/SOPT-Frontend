import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export function makeFetcher(
  config?: AxiosRequestConfig,
  configInstance?: (instance: AxiosInstance) => void
) {
  const instace = axios.create(config);
  configInstance?.(instace);
  return function (request, ...rest) {
    return request(instace, ...rest);
  };
}

interface IMakeServerFetcher {
  token?: string;
}

export const makeServerFetcher = ({ token }: IMakeServerFetcher = {}) => {
  const config: AxiosRequestConfig = { baseURL: process.env.API_GATEWAY_URL };
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: "Bearer " + token,
    };
  }
  return makeFetcher(config);
};

export async function serverDoFetch(
  fetcher,
  keys: any[]
): Promise<{ data: any; error: any }> {
  const [model, ...params] = keys;
  try {
    const response = await fetcher(model, ...params);
    if (response?.data?.success === false) {
      throw new Error(response?.data?.errMsg);
    }
    return {
      data: response?.data?.data,
      error: null,
    };
  } catch (error) {
    return { data: undefined, error: String(error) };
  }
}
