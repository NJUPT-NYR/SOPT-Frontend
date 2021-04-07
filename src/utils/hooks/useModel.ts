import type { AxiosInstance } from "axios";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { IModel } from "../model";
import { Revalidator } from "../tools";

interface IModelContext<TData = any, TParam = any> {
  fetcher: (model: IModel<TData, TParam>, param: TParam) => Promise<TData>;
  revalidator: Revalidator<IModel>;
}

export const ModelContext = React.createContext<IModelContext>(null);

export function useModel<TData = any, TParam = any>([model]: [
  IModel<TData, TParam>
]): {
  data: TData;
  error: any;
  isLoading: boolean;
  requester: (param: TParam) => Promise<{ data: TData; error: any }>;
} {
  const { fetcher, revalidator } = useContext<IModelContext<TData, TParam>>(
    ModelContext
  );
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TData | undefined>(undefined);
  const paramRef = useRef<TParam | undefined>(undefined);

  const requester = useCallback(
    async (param: TParam) => {
      paramRef.current = param;
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
        revalidator.revalidate(model);
      }
      return { data: nextData, error: nextError };
    },
    [model]
  );

  useEffect(() => {
    const callback = () => {
      requester(paramRef.current);
    };
    revalidator.register(model, callback);
    return () => {
      revalidator.revoke(model, callback);
    };
  }, [revalidator]);

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
