import axios from "axios";
import { parserProps } from "@/utils";
import qs from "query-string";

export const fetchPageProps = (path: string, queryObject?: any) => {
  const nextPath = qs.stringifyUrl(
    {
      url: path,
      query: {
        onlyProps: true,
        ...queryObject,
      },
    },
    { skipNull: true }
  );
  return axios.get(nextPath).then((response) => response.data);
};

const baseURL = ENABLE_MOCK
  ? "http://localhost:" + SERVER_PORT + "/mock"
  : API_GATEWAY_URL;

export const instance = axios.create({
  baseURL,
});
