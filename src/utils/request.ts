import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export function makeFetcher(
  config?: AxiosRequestConfig,
  configInstance?: (instance: AxiosInstance) => void
) {
  return function (request, ...rest) {
    const instace = axios.create(config);
    configInstance?.(instace);
    return request(instace, ...rest);
  };
}

export const makeServerFetcher = (token?: string) => {
  const config: AxiosRequestConfig = { baseURL: process.env.API_GATEWAY_URL };
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
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
      error: undefined,
    };
  } catch (error) {
    return { data: undefined, error };
  }
}
