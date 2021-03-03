import React, { useCallback, useMemo } from "react";
import "@/global.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { makeFetcher } from "@/utils/request";
import type { AxiosInstance } from "axios";

export default function App({ Component, pageProps }: AppProps) {
  const configInstance = useCallback((instance: AxiosInstance) => {
    instance.interceptors.response.use((response) => {
      if (response?.data?.success === false) {
        throw new Error(response?.data?.errMsg);
      }
      return response?.data?.data;
    });
  }, []);
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
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
