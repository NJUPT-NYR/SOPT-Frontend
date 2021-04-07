import type { AxiosInstance } from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";

interface IModelContext<TData = any, TParam = any> {
  fetcher: (model, param: TParam) => Promise<TData>;
}

export const ModelContext = React.createContext<IModelContext>(null);

type IModel<TData = any, TParam = any> = (
  instance: AxiosInstance,
  param?: TParam
) => Promise<TData>;

export function useModel<TData = any, TParam = any>([model]: [
  IModel<TData, TParam>
]): {
  data: TData;
  error: any;
  isLoading: boolean;
  requester: (param: TParam) => Promise<{ data: TData; error: any }>;
} {
  const { fetcher } = useContext<IModelContext<TData, TParam>>(ModelContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TData | undefined>(undefined);

  const requester = useCallback(
    async (param: TParam) => {
      setIsLoading(true);
      let nextData, nextError;
      try {
        nextData = await fetcher(model, param);
        setData(nextData);
      } catch (err) {
        nextError = err;
        setError(nextError);
      } finally {
        setIsLoading(false);
      }
      return { data: nextData, error: nextError };
    },
    [model]
  );
  return { data, error, requester, isLoading };
}

export function useInstantModel<TData = any, TParam = any>([model, param]: [
  IModel<TData, TParam>,
  TParam?
]): {
  data: TData;
  error: any;
  isLoading: boolean;
} {
  const { data, error, isLoading, requester } = useModel([model]);

  useEffect(() => {
    requester(param);
  }, [param]);

  return { data, error, isLoading };
}
