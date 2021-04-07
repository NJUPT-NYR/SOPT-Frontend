import React, { useCallback, useMemo } from "react";
import "@/global.css";
import { AppProps } from "next/app";

import { makeFetcher } from "@/utils/request";
import type { AxiosInstance } from "axios";
import { isBrowser } from "@/utils/tools";
import { COOKIE_NAME_JWT_TOKEN } from "@/utils/constants";
import Cookies from "universal-cookie";
import { ModelContext } from "@/utils/hooks/useModel";
import { revalidator } from "@/utils/revalidations";

interface IApp extends AppProps {
  cookie: any;
}

export default function App({ Component, pageProps }: IApp) {
  const configInstance = useCallback(
    (instance: AxiosInstance) => {
      if (isBrowser()) {
        const cookies = new Cookies();
        instance.interceptors.request.use((config) => {
          const token = cookies.get(COOKIE_NAME_JWT_TOKEN);
          if (token?.length) {
            config = {
              ...config,
              headers: {
                ...config.headers,
                Authorization: "Bearer " + token,
              },
            };
          }
          return config;
        });
      }
      instance.interceptors.response.use((response) => {
        if (response?.data?.success === false) {
          throw new Error(response?.data?.errMsg);
        }
        return response?.data?.data;
      });
    },
    [isBrowser]
  );
  const fetcher = useMemo(
    () =>
      makeFetcher(
        {
          baseURL: process.env.NEXT_PUBLIC_CLIENT_API_GATEWAY_URL,
        },
        configInstance
      ),
    [makeFetcher]
  );
  return (
    <ModelContext.Provider
      value={{
        fetcher,
        revalidator,
      }}
    >
      <Component {...pageProps} />
    </ModelContext.Provider>
  );
}
